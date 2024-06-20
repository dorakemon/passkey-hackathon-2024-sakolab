import { RedisDB } from "@/libs/redis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  RedisDB.Instance.set("verifier", "b133d4ad-c2b6-4844-9e71-8237b9be4790", {
    status: "presented",
    vp: "temp",
  });
  return NextResponse.json({ message: "Hello from Next.js!" });
}
