"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  generateHolderSecretCommitment,
  unblindVC,
} from "@/libs/vc/handlers/blindSign";
import { useState } from "react";
import { appendOrCreateUserVC } from "../../handlers/userStore";
import { AddCredentialInfoTable } from "./InfoTable";
import { AddCredentialQRReader } from "./QRReader";

export const AddCredentialDrawerContent = () => {
  const [issueId, setIssueId] = useState("");

  const handleScan = (_issueId: string) => {
    setIssueId(_issueId);
  };

  const handleReceiveVC = async () => {
    // TODO: MUST: HolderのUserIDの取り出し
    const userId = "dummy-dummy-dummy-user-id";
    const { commitment, blinding, pokForCommitment } =
      await generateHolderSecretCommitment(userId);
    const data = await fetch("/issuer/api", {
      method: "POST",
      body: JSON.stringify({
        issueId,
        blindSignPayload: {
          commitment,
          pokForCommitment,
        },
      }),
    });
    const vc_dash = await data.json();
    const vc = await unblindVC(vc_dash, blinding);
    await appendOrCreateUserVC(userId, vc);
    // TODO: MUST: ここで、VCを永続化する
  };

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>発行者のQR読み取り</DrawerTitle>
        <DrawerDescription>
          発行者が提示するQRコードをスキャンしてください
        </DrawerDescription>
      </DrawerHeader>

      {!issueId ? (
        <AddCredentialQRReader onScanUUID={handleScan} />
      ) : (
        <AddCredentialInfoTable
          issueId={issueId}
          issuerDomain="https://example.com"
        />
      )}

      <DrawerFooter>
        {issueId && (
          <Button className="w-full" onClick={handleReceiveVC}>
            受け取り
          </Button>
        )}
        <DrawerClose className="w-full">キャンセル</DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};
