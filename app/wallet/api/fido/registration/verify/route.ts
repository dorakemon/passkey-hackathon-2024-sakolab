import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { RegistrationResponseJSON } from "@simplewebauthn/types";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, expectedOrigin, rpID } from "../../constant";
import { deleteSession, getSession } from "../../session";
import {
  createUserSecretID,
  getCurrentUserDevices,
  saveUser,
} from "../../user";
import { generateWalletAttestationVC } from "../../wallet-attestation";

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionId) {
    return NextResponse.json(
      { error: "Unauthorized - sessionId is not found" },
      {
        status: 401,
      },
    );
  }

  const sessionData = await getSession(sessionId);
  if (!sessionData) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, challenge, userID } = sessionData;
  if (!email || !challenge || !userID) {
    return NextResponse.json(
      { error: "Unauthorized - sessionData may be lost" },
      {
        status: 401,
      },
    );
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
    return NextResponse.json(
      { error: (error as any).message },
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  if (!verification) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { verified, registrationInfo } = verification;

  if (verified && registrationInfo) {
    const { credentialPublicKey, credentialID, counter } = registrationInfo;
    const newDevice = {
      credentialPublicKey: Buffer.from(credentialPublicKey),
      credentialID,
      counter,
      transports: response.response.transports,
    };

    const userSecretID = createUserSecretID();
    const walletVC = await generateWalletAttestationVC(userSecretID);
    const devices = await getCurrentUserDevices(userID);

    console.log(walletVC);

    saveUser(
      {
        id: userID,
        email: email,
        devices: [...devices, newDevice],
      },
      userSecretID,
      walletVC,
    );
  }

  deleteSession(sessionId);

  let res = NextResponse.json({ verified });
  res.headers.set("Content-Type", "application/json");
  res.cookies.set("wallet-user-id", userID);
  return res;
}
