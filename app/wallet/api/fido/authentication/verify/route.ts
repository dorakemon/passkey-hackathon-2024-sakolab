import { NextRequest } from "next/server";
import { getSession, getUser } from "../../user";
import {
  VerifiedAuthenticationResponse,
  VerifyAuthenticationResponseOpts,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import { rpID, expectedOrigin } from "../../constant";
import { AuthenticationResponseJSON } from "@simplewebauthn/types";
import { RedisDB } from "@/libs/redis";

export async function POST(request: NextRequest) {
  const session = getSession();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const expectedChallenge = await RedisDB.Instance.get<string>(
    "authentication",
    session.id,
  );
  if (!expectedChallenge) {
    return new Response("Something error happened", { status: 401 });
  }

  const response: AuthenticationResponseJSON = await request.json();

  const userID = response.response.userHandle;
  if (!userID) {
    return new Response("User not found", { status: 401 });
  }

  const user = await getUser(userID);
  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const dbAuthenticator = user.device;

  if (!dbAuthenticator) {
    return new Response("Authenticator is not registered with this site", {
      status: 400,
    });
  }

  let verification: VerifiedAuthenticationResponse;
  try {
    const opts: VerifyAuthenticationResponseOpts = {
      response,
      expectedChallenge,
      expectedOrigin,
      expectedRPID: rpID,
      authenticator: dbAuthenticator,
      requireUserVerification: true,
    };
    verification = await verifyAuthenticationResponse(opts);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: (error as any).message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { verified, authenticationInfo } = verification;
  if (verified) {
    dbAuthenticator.counter = authenticationInfo.newCounter;
  }

  RedisDB.Instance.set("authentication", session.id, undefined);
  return new Response(JSON.stringify({ verified }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
