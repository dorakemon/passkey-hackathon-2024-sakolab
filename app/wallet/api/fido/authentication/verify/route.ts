import {
  VerifiedAuthenticationResponse,
  VerifyAuthenticationResponseOpts,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import { AuthenticationResponseJSON } from "@simplewebauthn/types";
import { NextRequest, NextResponse } from "next/server";
import { expectedOrigin, rpID } from "../../constant";
import { deleteSession, getSession } from "../../session";
import { getUserInfo } from "../../user";
import { isoBase64URL } from "@simplewebauthn/server/helpers";

export async function POST(request: NextRequest) {
  const sessionId = request.cookies.get("wallet-session")?.value;
  if (!sessionId) {
    return NextResponse.json(
      { error: "Unauthorized - sessionId is not found" },
      {
        status: 401,
      },
    );
  }

  const session = await getSession(sessionId);
  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized - session was expired" },
      { status: 401 },
    );
  }

  const expectedChallenge = session.challenge;
  if (!expectedChallenge) {
    return NextResponse.json(
      { error: "Something error happened" },
      { status: 401 },
    );
  }

  const response: AuthenticationResponseJSON = await request.json();

  const userID = response.response.userHandle
    ? isoBase64URL.toUTF8String(response.response.userHandle)
    : undefined;
  if (!userID) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const user = await getUserInfo(userID);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  let dbAuthenticator;
  for (const dev of user.devices) {
    if (dev.credentialID === response.id) {
      dbAuthenticator = dev;
      break;
    }
  }

  if (!dbAuthenticator) {
    return NextResponse.json(
      { error: "Authenticator is not registered with this site" },
      { status: 400 },
    );
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

  const { verified, authenticationInfo } = verification;
  if (verified) {
    dbAuthenticator.counter = authenticationInfo.newCounter;
  }

  deleteSession(sessionId);

  let res = NextResponse.json({ verified });
  res.headers.set("Content-Type", "application/json");
  res.cookies.set("wallet-user-id", userID);
  return res;
}
