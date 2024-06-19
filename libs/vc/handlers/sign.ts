import { VC, sign } from "@zkp-ld/jsonld-proofs";
import { DocumentLoader } from "@zkp-ld/jsonld-proofs/lib/types";
import { Result } from "../../../types/result";

export const generateVC = async (
  vc: string,
  keyPairs: string,
  documentLoader: DocumentLoader,
): Promise<Result<VC>> => {
  const vcJSON = JSON.parse(vc);
  const keyPairsJSON = JSON.parse(keyPairs);
  const vcSigned = await sign(vcJSON, keyPairsJSON, documentLoader);
  return { ok: true, value: vcSigned };
};
