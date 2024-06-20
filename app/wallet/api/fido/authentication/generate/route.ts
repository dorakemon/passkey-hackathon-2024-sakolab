import { NextRequest } from "next/server";
import { getSession, getUser } from "../../user";
import {
  GenerateAuthenticationOptionsOpts,
  generateAuthenticationOptions,
} from "@simplewebauthn/server";
import { timeout, rpID } from "../../constant";

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
