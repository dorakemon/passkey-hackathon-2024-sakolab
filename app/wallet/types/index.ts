import { AuthenticatorDevice } from "@simplewebauthn/types";

export const WALLET_SERVICE_NAME = "wallet";

export type UserStore = {
  id: string;
  email: string;
  devices: AuthenticatorDevice[];
  currentChallenge?: string;
  vcs: string[];
};

export type SessionStore = String;
