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
import { useState } from "react";
import { PresentCredentialInfoTable } from "./InfoTable";
import { PresentCredentialQRReader } from "./QRReader";

export const PresentCredentialDrawerContent = () => {
  const [verifierId, setVerifierId] = useState("");

  const handleScan = (_verifierId: string) => {
    setVerifierId(_verifierId);
  };

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>検証者のQR読み取り</DrawerTitle>
        <DrawerDescription>
          検証者が提示するQRコードをスキャンしてください
        </DrawerDescription>
      </DrawerHeader>

      {!verifierId ? (
        <PresentCredentialQRReader onScanUUID={handleScan} />
      ) : (
        <PresentCredentialInfoTable
          issueId={verifierId}
          issuerDomain="https://example.com"
        />
      )}

      <DrawerFooter>
        {verifierId && <Button className="w-full">提示</Button>}
        <DrawerClose className="w-full">キャンセル</DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};
