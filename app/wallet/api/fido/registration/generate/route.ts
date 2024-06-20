import { NextRequest } from "next/server";
import { createUser, getSession, getUser, saveUser } from "../../user";
import {
  GenerateRegistrationOptionsOpts,
  generateRegistrationOptions,
} from "@simplewebauthn/server";
import { rpID, rpName } from "../../constant";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const { email } = req;
  if (!email) {
    return new Response("Email is required", { status: 400 });
  }

  const newUser = await createUser(email);

  const session = getSession();
  if (!session) {
    //ここでsessionがない場合は、401エラーを返す？のか？
    return new Response("Unauthorized", { status: 401 });
  }
  session.id = newUser.id;

  const opts: GenerateRegistrationOptionsOpts = {
    rpName,
    rpID,
    userName: newUser.email,
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

  newUser.currentChallenge = registrationOptions.challenge;
  saveUser(newUser); //このタイミングでいいのか？

  return new Response(JSON.stringify(registrationOptions), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
