import { RedisDB } from "@/libs/redis";
import { VC } from "@zkp-ld/jsonld-proofs";
import { NextRequest, NextResponse } from "next/server";

export interface VCIssueRequest {
  userId: string;
  vc: any;
}

export async function POST(request: NextRequest) {
  const { userId, vc }: VCIssueRequest = await request.json();

  const vcs = await RedisDB.Instance.get<VC[]>("wallet:user:vcs", userId);
  const newVCs = vcs ? [...vcs, vc] : [vc];
  await RedisDB.Instance.set<VC[]>("wallet:user:vcs", userId, newVCs, true);

  return NextResponse.json({ success: true });
}
