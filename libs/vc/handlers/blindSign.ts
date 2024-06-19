import {
  VC,
  blindSign,
  requestBlindSign,
  verifyBlindSignRequest,
} from "@zkp-ld/jsonld-proofs";
import { Result } from "../../../types/result";

// TODO: ここのChallengeは毎回ランダムに生成しないといけないが、デモの簡単のために固定値を使っている
const ISSUER_CHALLENGE = "issuerChallenge";

export const generateHolderSecretCommitment = async (holderSecret: string) => {
  const secret = new Uint8Array(Buffer.from(holderSecret));
  const issuerChallenge = undefined;
  const { commitment, blinding, pokForCommitment } = await requestBlindSign(
    secret,
    issuerChallenge,
  );
  if (pokForCommitment === undefined) {
    throw Error;
  }
  return { commitment, blinding, pokForCommitment };
};

type GenerateBlindSignVCProps = {
  commitment: string;
  pokForCommitment: string;
  documentLoader: any;
  keyPairs: any;
};

export const generateBlindSignVC = async ({
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
      JSON.parse(doc),
      JSON.parse(keyPairs),
      documentLoader,
    );
    return { ok: true, value: vc };
  }
};
