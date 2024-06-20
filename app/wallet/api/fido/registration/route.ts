import { NextRequest } from "next/server";
import { getSession, getUser } from "../user";
import {
  GenerateRegistrationOptionsOpts,
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import {
  AuthenticatorDevice,
  RegistrationResponseJSON,
} from "@simplewebauthn/types";
import { expectedOrigin, rpID, rpName } from "../constant";

export async function GET(request: NextRequest) {
  const session = getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = getUser(session.id);
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const opts: GenerateRegistrationOptionsOpts = {
    rpName,
    rpID,
    userName: user.username,
    attestationType: "none",
    supportedAlgorithmIDs: [-7, -257],

    // for passkeys setting.
    // cf. https://simplewebauthn.dev/docs/advanced/passkeys
    authenticatorSelection: {
      residentKey: "required",
      userVerification: "preferred",
    },
  };

  const registrationOptions = await generateRegistrationOptions(opts);

  user.currentChallenge = registrationOptions.challenge;

  return new Response(JSON.stringify(registrationOptions), {
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

  const response: RegistrationResponseJSON = await request.json();
  const expectedChallenge = user.currentChallenge;

  let verification;
  try {
    if (expectedChallenge)
      verification = await verifyRegistrationResponse({
        response,
        expectedChallenge,
        expectedOrigin,
        expectedRPID: rpID,
        requireUserVerification: true,
      });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: (error as any).message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (!verification) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { verified, registrationInfo } = verification;

  if (verified && registrationInfo) {
    const { credentialPublicKey, credentialID, counter } = registrationInfo;

    const existingDevice = user.devices.find(
      (device) => device.credentialID === credentialID,
    );

    if (!existingDevice) {
      const newDevice: AuthenticatorDevice = {
        credentialPublicKey,
        credentialID,
        counter,
        transports: response.response.transports,
      };
      user.devices.push(newDevice);
    }
  }

  user.currentChallenge = undefined;

  return new Response(JSON.stringify({ verified }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
