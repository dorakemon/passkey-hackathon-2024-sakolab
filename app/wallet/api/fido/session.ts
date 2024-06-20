import { RedisDB } from "@/libs/redis";

type Session = {
  challenge: string;
  email?: string;
  userID?: string;
};

export const createSessionId = (): string => {
  return Math.random().toString(36).substring(2);
};

export const setSession = (sessionId: string, session: Session): void => {
  RedisDB.Instance.set("wallet-session", sessionId, session);
};

export const getSession = (sessionId: string): Promise<Session | null> => {
  return RedisDB.Instance.get<Session>("wallet-session", sessionId);
};

export const deleteSession = (sessionId: string): void => {
  RedisDB.Instance.delete("wallet-session", sessionId);
};
