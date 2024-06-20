"use client";

import { isValidUUID } from "@/libs/uuid";
import { useState } from "react";
import { useZxing } from "react-zxing";

type PresentCredentialQRReaderProps = {
  onScanVerifierQr: (
    verifierChallenge: string,
    requestAttributes: string[],
  ) => void;
};

export const PresentCredentialQRReader = ({
  onScanVerifierQr,
}: PresentCredentialQRReaderProps) => {
  const [error, setError] = useState("");

  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText();
      const qrData = JSON.parse(text);
      if (!isValidUUID(qrData.verifyChallenge)) {
        setError(`QRが無効です - ${text}`);
        return;
      }
      onScanVerifierQr(qrData.verifyChallenge, qrData.requestAttributes);
    },
  });

  return (
    <div>
      <div className="flex flex-col items-center width-[320px] height-[320px] border">
        <video ref={ref} />
      </div>
      <p className="text-red-600 text-center">{error && error}</p>
    </div>
  );
};
