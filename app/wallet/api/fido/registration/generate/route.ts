import { NextRequest, NextResponse } from "next/server";
import { createUser, getSession, getUser, saveUser } from "../../user";
import {
  GenerateRegistrationOptionsOpts,
  generateRegistrationOptions,
} from "@simplewebauthn/server";
import { rpID, rpName } from "../../constant";
import { RedisDB } from "@/libs/redis";
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
  const session = getSession();

  const obj: RegistrationInfo = {
    email,
    challenge: registrationOptions.challenge,
    userID: registrationOptions.user.id,
  };

  RedisDB.Instance.set("registration", session.id, obj);

  return NextResponse.json(registrationOptions);
}
