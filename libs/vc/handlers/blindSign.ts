import { Result } from "@/types/result";
import {
  VC,
  blindSign,
  requestBlindSign,
  unblind,
  verifyBlindSignRequest,
} from "@zkp-ld/jsonld-proofs";
import { documentLoader } from "./documentLoader";

// TODO: ここのChallengeは毎回ランダムに生成しないといけないが、デモの簡単のために固定値を使っている
const ISSUER_CHALLENGE = "issuerChallenge";

export const generateHolderSecretCommitment = async (holderSecret: string) => {
  const secret = new Uint8Array(Buffer.from(holderSecret));
  const { commitment, blinding, pokForCommitment } = await requestBlindSign(
    secret,
    ISSUER_CHALLENGE,
  );
  if (pokForCommitment === undefined) {
    throw Error;
  }
  return { commitment, blinding, pokForCommitment };
};

type GenerateBlindSignVCProps = {
  doc: unknown;
  keyPairs: string;
  commitment: string;
  pokForCommitment: string;
  documentLoader: any;
};

export const generateBlindSignVC = async ({
  doc,
  keyPairs,
  commitment,
  pokForCommitment,
}: GenerateBlindSignVCProps): Promise<Result<VC>> => {
  const verified = await verifyBlindSignRequest(
    commitment,
    pokForCommitment,
    ISSUER_CHALLENGE,
  );
  if (verified.verified === false && verified.error) {
    return {
      ok: false,
      error: `failed to verify blind sign request - ${verified.error}`,
    };
  } else {
    const vc = await blindSign(
      commitment,
      doc as VC,
      JSON.parse(keyPairs),
      documentLoader,
    );
    return { ok: true, value: vc };
  }
};

export const unblindVC = async (vc: VC, blinding: string): Promise<VC> => {
  return unblind(vc, blinding, documentLoader);
};
