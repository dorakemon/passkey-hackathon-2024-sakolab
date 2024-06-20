"use client";

import { RedisDB } from "@/libs/redis";
import { exampleKeyPairs } from "@/libs/vc/data";
import { exampleDocs } from "@/libs/vc/data/doc";
import { documentLoader } from "@/libs/vc/handlers/documentLoader";
import { generateVC } from "@/libs/vc/handlers/sign";

export default () => {
  const generateVCHandler = async () => {
    const vcResult = await generateVC(
      JSON.stringify(exampleDocs.get("Person1")),
      exampleKeyPairs,
      documentLoader,
    );
    console.log(vcResult);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>This is Wallet Home</div>
      <button className="btn" onClick={generateVCHandler}>
        Issue VC
      </button>
      <button
        onClick={async () => {
          await RedisDB.Instance.set("wallet", "test", "test123");
        }}
      >
        セット
      </button>
      <button
        onClick={async () => {
          const result = await RedisDB.Instance.get("wallet", "test");
          console.log(result);
        }}
      >
        ゲット
      </button>
    </main>
  );
};
