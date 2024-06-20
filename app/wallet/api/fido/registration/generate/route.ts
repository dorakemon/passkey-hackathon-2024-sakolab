import {
  GenerateRegistrationOptionsOpts,
  generateRegistrationOptions,
} from "@simplewebauthn/server";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, rpID, rpName } from "../../constant";
import { createSessionId, setSession } from "../../session";
import { RegistrationInfo } from "../type";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) {
    return new Response("Email is required", { status: 400 });
  }

  const opts: GenerateRegistrationOptionsOpts = {
    rpName,
    rpID,
    userName: email,
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
  const sessionId = createSessionId();

  const obj: RegistrationInfo = {
    email,
    challenge: registrationOptions.challenge,
    userID: registrationOptions.user.id,
  };
  setSession(sessionId, obj);

  let response = NextResponse.json(registrationOptions);
  response.cookies.set(SESSION_COOKIE_NAME, sessionId);
  return response;
}
