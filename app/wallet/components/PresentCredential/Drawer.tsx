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
  const [verifierChallenge, setVerifierChallenge] = useState("");
  const [requestAttributes, setRequestAttributes] = useState<string[]>([]);

  const handleScan = (
    verifierChallenge: string,
    requestAttributes: string[],
  ) => {
    setVerifierChallenge(verifierChallenge);
    setRequestAttributes(requestAttributes);
  };

  const handlePresentVerifiablePresentation = () => {};

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>検証者のQR読み取り</DrawerTitle>
        <DrawerDescription>
          検証者が提示するQRコードをスキャンしてください
        </DrawerDescription>
      </DrawerHeader>

      {!verifierChallenge ? (
        <PresentCredentialQRReader onScanVerifierQr={handleScan} />
      ) : (
        <PresentCredentialInfoTable
          verifierChallenge={verifierChallenge}
          verifierDomain="https://passkey-hackathon-2024-sakolab.vercel.app/"
          requestAttributes={requestAttributes}
        />
      )}

      <DrawerFooter>
        {verifierChallenge && (
          <Button
            onClick={handlePresentVerifiablePresentation}
            className="w-full"
          >
            提示
          </Button>
        )}
        <DrawerClose className="w-full">キャンセル</DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};
