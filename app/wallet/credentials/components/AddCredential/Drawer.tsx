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
import { AddCredentialInfoTable } from "./InfoTable";
import { AddCredentialQRReader } from "./QRReader";

export const AddCredentialDrawerContent = () => {
  const [issuerId, setIssuerId] = useState("");

  const handleScan = (_issuerId: string) => {
    setIssuerId(_issuerId);
  };

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>発行者のQR読み取り</DrawerTitle>
        <DrawerDescription>
          発行者が提示するQRコードをスキャンしてください
        </DrawerDescription>
      </DrawerHeader>

      {!issuerId ? (
        <AddCredentialQRReader onScanUUID={handleScan} />
      ) : (
        <AddCredentialInfoTable
          issueId={issuerId}
          issuerDomain="https://example.com"
        />
      )}

      <DrawerFooter>
        {issuerId && <Button className="w-full">受け取り</Button>}
        <DrawerClose>
          <Button variant="outline" className="w-full">
            キャンセル
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};
