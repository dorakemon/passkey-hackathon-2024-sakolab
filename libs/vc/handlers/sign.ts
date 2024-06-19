import { Result } from "@/types/result";
import { VC, sign } from "@zkp-ld/jsonld-proofs";
import { DocumentLoader } from "@zkp-ld/jsonld-proofs/lib/types";

export const generateVC = async (
  doc: string,
  keyPairs: string,
  documentLoader: DocumentLoader,
): Promise<Result<VC>> => {
  const docJSON = JSON.parse(doc);
  const keyPairsJSON = JSON.parse(keyPairs);
  const vcSigned = await sign(docJSON, keyPairsJSON, documentLoader);
  return { ok: true, value: vcSigned };
};
