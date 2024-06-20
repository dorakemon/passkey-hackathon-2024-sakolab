import { generateMynumberDoc } from "@/app/issuer/servers/generateMynumberDoc";
import { NextResponse } from "next/server";
import { appendOrCreateUserVC } from "../../handlers/userStore";

export async function GET(request: Request) {
  await appendOrCreateUserVC(
    "b133d4ad-c2b6-4844-9e71-8237b9be4790",
    generateMynumberDoc({
      name: "山田太郎",
      address: "東京都港区",
      birthdate: "2024-01-01",
      gender: "男性",
    }),
  );
  await appendOrCreateUserVC(
    "b133d4ad-c2b6-4844-9e71-8237b9be4790",
    generateMynumberDoc({
      name: "太田花子",
      address: "東京都港区",
      birthdate: "2024-01-01",
      gender: "女性",
    }),
  );
  return NextResponse.json({ message: "Hello from Next.js!" });
}
