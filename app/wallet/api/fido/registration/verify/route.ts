import { verifyRegistrationResponse } from "@simplewebauthn/server";
import {
  AuthenticatorDevice,
  RegistrationResponseJSON,
} from "@simplewebauthn/types";
import { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, expectedOrigin, rpID } from "../../constant";
import { deleteSession, getSession } from "../../session";
import { createUser, saveUser } from "../../user";

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) {
    return new Response("Unauthorized - sessionId is not found", {
      status: 401,
    });
  }

  const sessionData = await getSession(sessionId);
  if (!sessionData) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { email, challenge, userID } = sessionData;
  if (!email || !challenge || !userID) {
    return new Response("Unauthorized - sessionData may be lost", {
      status: 401,
    });
  }

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

  deleteSession(sessionId);

  return new Response(JSON.stringify({ verified }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
