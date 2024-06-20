import { NextRequest } from "next/server";
import { getSession, getUser } from "../../user";
import {
  GenerateAuthenticationOptionsOpts,
  generateAuthenticationOptions,
} from "@simplewebauthn/server";
import { timeout, rpID } from "../../constant";
import { RedisDB } from "@/libs/redis";

export async function GET(request: NextRequest) {
  const session = getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const opts: GenerateAuthenticationOptionsOpts = {
    timeout,
    userVerification: "preferred",
    rpID,
  };

  const options = await generateAuthenticationOptions(opts);

  RedisDB.Instance.set("authentication", session.id, options.challenge);

  return new Response(JSON.stringify(options), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
