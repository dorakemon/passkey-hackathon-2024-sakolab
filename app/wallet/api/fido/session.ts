import { RedisDB } from "@/libs/redis";
import { nanoid } from "nanoid";

type Session = {
  challenge: string;
  email?: string;
  userID?: string;
};

export const createSessionId = (): string => {
  return nanoid(30);
};

export const setSession = (sessionId: string, session: Session): void => {
  RedisDB.Instance.set("wallet:session", sessionId, session);
};

export const getSession = (sessionId: string): Promise<Session | null> => {
  return RedisDB.Instance.get<Session>("wallet:session", sessionId);
};

export const deleteSession = (sessionId: string): void => {
  RedisDB.Instance.delete("wallet:session", sessionId);
};
