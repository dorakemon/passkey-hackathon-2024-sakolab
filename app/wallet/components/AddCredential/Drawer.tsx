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
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { AddCredentialInfoTable } from "./InfoTable";
import { AddCredentialQRReader } from "./QRReader";

export const AddCredentialDrawerContent = () => {
  const [issueId, setIssueId] = useState("");
  const cookies = useCookies();

  const handleScan = (_issueId: string) => {
    setIssueId(_issueId);
  };

  const handleReceiveVC = async () => {
    const userId = cookies.get("wallet-user-id");
    if (!userId) {
      throw new Error("User ID not found");
    }

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

    await fetch("/wallet/api/vc", {
      method: "POST",
      body: JSON.stringify({
        userId,
        vc: vc,
      }),
    });
    window.location.reload();
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
          issuerDomain="https://passkey-hackathon-2024-sakolab.vercel.app"
        />
      )}

      <DrawerFooter>
        {issueId && (
          <Button className="w-full" onClick={handleReceiveVC}>
            提示
          </Button>
        )}
        <DrawerClose className="w-full">キャンセル</DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};
