import { NextRequest } from "next/server";
import { createUser, getSession, getUser, saveUser } from "../../user";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import {
  AuthenticatorDevice,
  RegistrationResponseJSON,
} from "@simplewebauthn/types";
import { expectedOrigin, rpID, rpName } from "../../constant";
import { RedisDB } from "@/libs/redis";

export async function POST(request: NextRequest) {
  const session = getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const sessionData = await RedisDB.Instance.get<string>(
    "registration",
    session.id,
  );
  if (!sessionData) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { email, challenge, userID } = JSON.parse(sessionData);

  const response: RegistrationResponseJSON = await request.json();

  const expectedChallenge = challenge;
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
    const newDevice: AuthenticatorDevice = {
      credentialPublicKey,
      credentialID,
      counter,
      transports: response.response.transports,
    };

    const user = createUser(userID, email, newDevice);

    saveUser(user);
  }

  RedisDB.Instance.set("registration", session.id, undefined);

  return new Response(JSON.stringify({ verified }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
