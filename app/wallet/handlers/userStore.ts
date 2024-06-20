import { RedisDB } from "@/libs/redis";

const servicePrefix = "wallet-credentials";

type VC = object;
type UserCredentialsStore = VC[];

export const appendOrCreateUserVC = async (userID: string, vc: VC) => {
  let userVCs = await RedisDB.Instance.get<UserCredentialsStore>(
    servicePrefix,
    userID,
  );
  if (!userVCs) {
    userVCs = [];
  }
  userVCs.push(vc);
  // TODO: APIの見直し
  await RedisDB.Instance.delete(servicePrefix, userID);
  await RedisDB.Instance.set(servicePrefix, userID, userVCs);
};

export const getUserVCs = (userID: string) => {
  return RedisDB.Instance.get<VC[]>(servicePrefix, userID);
};
