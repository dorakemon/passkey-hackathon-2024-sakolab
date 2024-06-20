import { Result } from "@/types/result";
import { VC, sign } from "@zkp-ld/jsonld-proofs";
import { DocumentLoader } from "@zkp-ld/jsonld-proofs/lib/types";

export const generateVC = async (
  doc: VC,
  keyPairs: string,
  documentLoader: DocumentLoader,
): Promise<Result<VC>> => {
  const keyPairsJSON = JSON.parse(keyPairs);
  const vcSigned = await sign(doc, keyPairsJSON, documentLoader);
  return { ok: true, value: vcSigned };
};
