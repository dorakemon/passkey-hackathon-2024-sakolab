import { NextRequest } from "next/server";
import { getSession, getUser } from "../user";
import {
  GenerateAuthenticationOptionsOpts,
  VerifiedAuthenticationResponse,
  VerifyAuthenticationResponseOpts,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import { timeout, rpID, expectedOrigin } from "../constant";

export async function GET(request: NextRequest) {
  const session = getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = getUser(session.id);
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const opts: GenerateAuthenticationOptionsOpts = {
    timeout,
    userVerification: "preferred",
    rpID,
  };

  const options = await generateAuthenticationOptions(opts);

  user.currentChallenge = options.challenge;

  return new Response(JSON.stringify(options), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: NextRequest) {
  const session = getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = getUser(session.id);
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const response = await request.json();
  const expectedChallenge = user.currentChallenge;
  if (!expectedChallenge) {
    return new Response("Something error happened.", {
      status: 400,
    });
  }

  let dbAuthenticator;
  for (const dev of user.devices) {
    if (dev.credentialID === response.id) {
      dbAuthenticator = dev;
      break;
    }
  }

  if (!dbAuthenticator) {
    return new Response("Authenticator is not registered with this site", {
      status: 400,
    });
  }

  let verification: VerifiedAuthenticationResponse;
  try {
    const opts: VerifyAuthenticationResponseOpts = {
      response,
      expectedChallenge,
      expectedOrigin,
      expectedRPID: rpID,
      authenticator: dbAuthenticator,
      requireUserVerification: true,
    };
    verification = await verifyAuthenticationResponse(opts);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: (error as any).message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { verified, authenticationInfo } = verification;
  if (verified) {
    dbAuthenticator.counter = authenticationInfo.newCounter;
  }

  user.currentChallenge = undefined;

  return new Response(JSON.stringify({ verified }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
