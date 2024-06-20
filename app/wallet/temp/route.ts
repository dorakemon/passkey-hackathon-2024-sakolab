import { RedisDB } from "@/libs/redis";
import { NextResponse } from "next/server";

export async function GET() {
  // const db = await RedisDB.Instance.set("wallet", "test", "test123");
  const data = await RedisDB.Instance.get("wallet", "test");
  return NextResponse.json({ message: data });
}
