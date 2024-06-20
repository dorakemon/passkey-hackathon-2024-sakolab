export const vcToBase4AttributesAndId = (
  vc: any,
): {
  id: string;
  name: string;
  address: string;
  birthdate: string;
  gender: string;
} => {
  const vcId = vc.id;
  const vcIdPaths = vcId.split("/");
  const viewId = `${vcIdPaths[vcIdPaths.length - 2]}-${vcIdPaths[vcIdPaths.length - 1]}`;

  return {
    id: viewId,
    name: vc.credentialSubject.name,
    address: vc.credentialSubject.address,
    birthdate: vc.credentialSubject.birthdate,
    gender: vc.credentialSubject.gender,
  };
};

export const getVCFromVCId = (vcs: any[], viewId: string) => {
  return vcs.find((vc) => {
    const vcIdPaths = vc.id.split("/");
    const vcViewId = `${vcIdPaths[vcIdPaths.length - 2]}-${vcIdPaths[vcIdPaths.length - 1]}`;
    return vcViewId === viewId;
  });
};
