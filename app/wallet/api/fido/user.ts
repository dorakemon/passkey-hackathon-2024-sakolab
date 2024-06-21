import { RedisDB } from "@/libs/redis";
import { AuthenticatorDevice } from "@simplewebauthn/types";
import { nanoid } from "nanoid";

type UserId = string;

type User = {
  id: string;
  email: string;
  devices: AuthenticatorDevice[];
};

export const getUserInfo = async (userId: UserId) => {
  const user = await RedisDB.Instance.get<User>("wallet:user:info", userId);
  if (!user) {
    return undefined;
  }
  return user;
};

export const saveUser = async (
  user: User,
  userSecretID: string,
  walletVC: string,
) => {
  const promises = [
    RedisDB.Instance.set("wallet:user:info", user.id, user, true),
    RedisDB.Instance.set("wallet:email", user.email, user.id, true),
    RedisDB.Instance.set("wallet:user:vcs", user.id, [walletVC], true),
    RedisDB.Instance.set("wallet:user:secret", user.id, userSecretID, true),
  ];
  await Promise.all(promises);
};

export const createUserSecretID = (): string => {
  return nanoid(30);
};

export const getCurrentUserDevices = async (
  userId: UserId,
): Promise<AuthenticatorDevice[]> => {
  const user = await getUserInfo(userId);
  if (!user) {
    return [];
  }
  return user.devices;
};

export const getUserIdByEmail = async (
  email: string,
): Promise<string | null> => {
  return await RedisDB.Instance.get("wallet:email", email);
};

export const isEmailAlreadyRegistered = async (
  email: string,
): Promise<boolean> => {
  const res = await RedisDB.Instance.get("wallet:email", email);
  if (res) return true;
  return false;
};
