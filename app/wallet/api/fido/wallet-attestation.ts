import { exampleKeyPairs } from "@/libs/vc/data";
import { documentLoader } from "@/libs/vc/handlers/documentLoader";
import { generateVC } from "@/libs/vc/handlers/sign";

const initWalletAttestationDoc = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/ns/data-integrity/v1",
    "https://schema.org/",
  ],
  id: "http://example.org/credentials/city/1",
  type: "VerifiableCredential",
  issuer: "did:example:issuer0",
  issuanceDate: "2023-01-01T00:00:00Z",
  expirationDate: "2026-01-01T00:00:00Z",
  credentialSubject: {
    id: "did:user:12341234",
    secretValue: "asdfasdfasdfasdf",
  },
  proof: {
    type: "DataIntegrityProof",
    proofPurpose: "assertionMethod",
    verificationMethod: "did:example:issuer0#bls12_381-g2-pub001",
  },
};

export const generateWalletAttestationVC = async (secretValue: string) => {
  const randomID = parseInt(String(Math.random() * 100000000));
  const randomUserID = parseInt(String(Math.random() * 100000000));

  const doc: typeof initWalletAttestationDoc = {
    ...initWalletAttestationDoc,
    id: `https://example.com/wallet-attestation/${randomID}`,
    issuanceDate: `${new Date().toISOString()}`,
    expirationDate: `${new Date(
      new Date().setFullYear(new Date().getFullYear() + 3),
    ).toISOString()}`,
    credentialSubject: {
      ...initWalletAttestationDoc.credentialSubject,
      id: `did:user:${randomUserID}`,
      secretValue,
    },
  };

  return generateVC(doc, exampleKeyPairs, documentLoader);
};
