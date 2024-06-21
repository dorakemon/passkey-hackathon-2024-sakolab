import { RedisDB } from "@/libs/redis";

type VC = object;
type UserCredentialsStore = VC[];

//  TODO: MUST: 永続化　eternalを入れる

export const appendOrCreateUserVC = async (userID: string, vc: VC) => {
  let userVCs = await RedisDB.Instance.get<UserCredentialsStore>(
    "wallet:user:vcs",
    userID,
  );
  if (!userVCs) {
    userVCs = [];
  }
  userVCs.push(JSON.stringify(vc) as any);
  // TODO: APIの見直し
  await RedisDB.Instance.delete("wallet:user:vcs", userID);
  await RedisDB.Instance.set("wallet:user:vcs", userID, userVCs);
};

export const getUserVCs = (userID: string) => {
  return RedisDB.Instance.get<VC[]>("wallet:user:vcs", userID);
};
