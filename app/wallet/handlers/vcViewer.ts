export const vcToBase4AttributesAndId = (
  vc: any,
): {
  id: string;
  name: string;
  address: string;
  birthdate: string;
  gender: string;
} => {
  return {
    id: vc.id,
    name: vc.credentialSubject.name,
    address: vc.credentialSubject.address,
    birthdate: vc.credentialSubject.birthdate,
    gender: vc.credentialSubject.gender,
  };
};

export const getVCFromVCId = (vcs: any[], vcId: string) => {
  return vcs.findLast((vc) => vc.id === vcId);
};
