import { RedisDB } from "@/libs/redis";
import { AuthenticatorDevice } from "@simplewebauthn/types";

type UserId = string;

type User = {
  id: string;
  email: string;
  device: AuthenticatorDevice;
};

export const getUser = async (userId: UserId) => {
  const user = await RedisDB.Instance.get<User>("user", userId);
  if (!user) {
    return undefined;
  }
  return user;
};

export const saveUser = (user: User): void => {
  RedisDB.Instance.set("user", user.id, user);
};

export const createUser = (
  id: UserId,
  email: string,
  device: AuthenticatorDevice,
): User => {
  return {
    id,
    email,
    device,
  };
};
