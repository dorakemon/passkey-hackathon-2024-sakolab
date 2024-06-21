import {
  GenerateRegistrationOptionsOpts,
  generateRegistrationOptions,
} from "@simplewebauthn/server";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, rpID, rpName } from "../../constant";
import { createSessionId, setSession } from "../../session";
import { getCurrentUserDevices, getUserIdByEmail } from "../../user";
import { RegistrationInfo } from "../type";

export async function POST(req: NextRequest) {
  const { email, recovery } = await req.json();
  if (!email) {
    return new Response("Email is required", { status: 400 });
  }

  const storedUserID = await getUserIdByEmail(email);
  const isEmailAlreadyRegistered = storedUserID !== null;
  // !recovery なら新規登録
  if (!recovery && isEmailAlreadyRegistered) {
    return new Response("Email is already registered", { status: 400 });
  }

  if (recovery && !isEmailAlreadyRegistered) {
    return new Response("Email is not registered", { status: 400 });
  }

  // 新規登録時はundefinedにして新しくUserIDを生成
  const userID = storedUserID ? Buffer.from(storedUserID) : undefined;
  const devices = storedUserID ? await getCurrentUserDevices(storedUserID) : [];
  const opts: GenerateRegistrationOptionsOpts = {
    rpName,
    rpID,
    userID,
    userName: email,
    attestationType: "none",
    supportedAlgorithmIDs: [-7, -257],

    // for passkeys setting.
    // cf. https://simplewebauthn.dev/docs/advanced/passkeys
    authenticatorSelection: {
      residentKey: "required",
      userVerification: "preferred",
    },
    excludeCredentials: devices.map((dev) => ({
      id: dev.credentialID,
      type: "public-key",
      transports: dev.transports,
    })),
  };

  const registrationOptions = await generateRegistrationOptions(opts);
  const sessionId = createSessionId();

  const obj: RegistrationInfo = {
    email,
    challenge: registrationOptions.challenge,
    userID: storedUserID ?? registrationOptions.user.id,
  };
  setSession(sessionId, obj);

  let response = NextResponse.json(registrationOptions);
  response.cookies.set(SESSION_COOKIE_NAME, sessionId);
  return response;
}
