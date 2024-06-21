import { RedisDB } from "@/libs/redis";
import { NextRequest, NextResponse } from "next/server";
import { ISSUER_SERVICE_NAME, IssueDataStore } from "../types.local";

export interface VCIssueRequest {
  verifiablePresentation: string;
}

export async function POST(request: NextRequest) {
  const { verifiablePresentation }: VCIssueRequest = await request.json();

  const issueData = await RedisDB.Instance.get<IssueDataStore>(
    ISSUER_SERVICE_NAME,
    issueId,
  );

  // TODO: verifier logics
  // if (!issueData) {
  //   return new NextResponse(
  //     JSON.stringify({ error: "Invalid issueId provided" }),
  //     { status: 400 },
  //   );
  // }

  // if (issueData.status === "issued") {
  //   return new NextResponse(
  //     JSON.stringify({ error: "This issueId has already been issued" }),
  //     { status: 400 },
  //   );
  // }

  // const { name, address, birthdate, gender } = issueData.issueAttributes;

  // const doc = generateMynumberDoc({
  //   name,
  //   address,
  //   birthdate,
  //   gender,
  // });

  // const vcResult = await generateBlindSignVC({
  //   doc,
  //   keyPairs: exampleKeyPairs,
  //   commitment,
  //   pokForCommitment,
  //   documentLoader,
  // });

  if (!vcResult.ok) {
    return new NextResponse(JSON.stringify({ error: vcResult.error }), {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(vcResult.value), {
    status: 201,
  });
}
