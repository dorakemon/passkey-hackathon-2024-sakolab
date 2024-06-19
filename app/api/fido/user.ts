import { AuthenticatorDevice } from "@simplewebauthn/types";

type UserId = string;

type User = {
  id: UserId;
  username: string;
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

type Session = {
  id: string;
};

export const getSession = (): Session => {
  return { id: "example-user-id" };
};
