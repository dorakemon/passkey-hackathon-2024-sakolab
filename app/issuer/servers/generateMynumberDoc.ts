const initMynumberDoc = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/ns/data-integrity/v1",
    "https://schema.org/",
  ],
  id: "mynumber-1",
  type: "VerifiableCredential",
  issuer: "did:example:issuer1",
  issuanceDate: "2023-01-01T00:00:00Z",
  expirationDate: "2026-01-01T00:00:00Z",
  credentialSubject: {
    id: "did:user:12341234",
    type: "MyNumberCard",
    name: "太郎",
    birthdate: "2024-1-1",
    gender: "male",
    address: "新宿区",
  },
  proof: {
    type: "DataIntegrityProof",
    proofPurpose: "assertionMethod",
    verificationMethod: "did:example:issuer1#bls12_381-g2-pub001",
  },
};

export const generateMynumberDoc = ({
  name,
  birthdate,
  gender,
  address,
}: {
  name: string;
  address: string;
  birthdate: string;
  gender: string;
}) => {
  const randomMynumberID = parseInt(String(Math.random() * 100000000));
  const randomUserID = parseInt(String(Math.random() * 100000000));

  const doc: typeof initMynumberDoc = {
    ...initMynumberDoc,
    id: `mynumber-${randomMynumberID}`,
    issuanceDate: `${new Date().toISOString()}`,
    expirationDate: `${new Date(
      new Date().setFullYear(new Date().getFullYear() + 3),
    ).toISOString()}`,
    credentialSubject: {
      ...initMynumberDoc.credentialSubject,
      id: `did:user:${randomUserID}`,
      name,
      birthdate,
      gender,
      address,
    },
  };

  return doc;
};
