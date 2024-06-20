import { AuthenticatorDevice } from "@simplewebauthn/types";
import { randomUUID } from "node:crypto";

type UserId = string;

type User = {
  id: UserId;
  email: string;
  devices: AuthenticatorDevice[];
  currentChallenge?: string;
};

let users: Record<UserId, User> = {};

export const getUser = (userId: UserId): User | undefined => {
  return users[userId];
};

export const saveUser = (user: User): void => {
  users[user.id] = user;
};
const createUserId = async (): Promise<UserId> => {
  return "example-user-id";
  return randomUUID();
};

export const createUser = async (email: string): Promise<User> => {
  const id = await createUserId();
  const user: User = {
    id,
    email,
    devices: [],
  };
  return user;
};

type Session = {
  id: string;
};

export const getSession = (): Session => {
  return { id: "example-user-id" };
};
