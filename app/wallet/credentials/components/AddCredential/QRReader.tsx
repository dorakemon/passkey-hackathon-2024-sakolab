"use client";

import { isValidUUID } from "@/libs/uuid";
import { useState } from "react";
import { useZxing } from "react-zxing";

type AddCredentialQRReaderProps = {
  onScanUUID: (uuid: string) => void;
};

export const AddCredentialQRReader = ({
  onScanUUID,
}: AddCredentialQRReaderProps) => {
  const [error, setError] = useState("");

  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText();
      if (!isValidUUID(text)) {
        setError(`QRが無効です - ${text}`);
        return;
      }
      onScanUUID(text);
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
