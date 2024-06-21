import {
  GenerateAuthenticationOptionsOpts,
  generateAuthenticationOptions,
} from "@simplewebauthn/server";
import { NextRequest, NextResponse } from "next/server";
import { rpID, timeout } from "../../constant";
import { createSessionId, setSession } from "../../session";

export async function GET(request: NextRequest) {
  const sessionId = createSessionId();

  const opts: GenerateAuthenticationOptionsOpts = {
    timeout,
    userVerification: "preferred",
    rpID,
  };

  const options = await generateAuthenticationOptions(opts);

  setSession(sessionId, {
    challenge: options.challenge,
  });

  let response = NextResponse.json(options, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  response.headers.set(
    "Set-Cookie",
    `wallet-session=${sessionId}; Path=/wallet`,
  );
  return response;
}
