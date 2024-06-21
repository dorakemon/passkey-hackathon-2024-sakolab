import {
  VerifiedAuthenticationResponse,
  VerifyAuthenticationResponseOpts,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import { AuthenticationResponseJSON } from "@simplewebauthn/types";
import { NextRequest } from "next/server";
import { expectedOrigin, rpID } from "../../constant";
import { deleteSession, getSession } from "../../session";
import { getUserInfo } from "../../user";

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get("wallet-session")?.value;
  if (!sessionId) {
    return new Response("Unauthorized - sessionId is not found", {
      status: 401,
    });
  }

  const session = await getSession(sessionId);
  if (!session) {
    return new Response("Unauthorized - session was expired", { status: 401 });
  }

  const expectedChallenge = session.challenge;
  if (!expectedChallenge) {
    return new Response("Something error happened", { status: 401 });
  }

  const response: AuthenticationResponseJSON = await request.json();

  const userID = response.response.userHandle;
  if (!userID) {
    return new Response("User not found", { status: 401 });
  }

  const user = await getUserInfo(userID);
  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  // TODO: ここでcredential IDによる検索を行う
  const dbAuthenticator = user.devices[0];

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
      authenticator: {
        ...dbAuthenticator,
        credentialID: dbAuthenticator.credentialID,
        credentialPublicKey: new Uint8Array(
          (dbAuthenticator.credentialPublicKey as any).data,
        ),
      },
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

  deleteSession(sessionId);

  return new Response(JSON.stringify({ verified }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
