const isProduction = process.env.NODE_ENV === "production";

export const rpName = "sakolab";
export const rpID = isProduction
  ? "passkey-hackathon-2024-sakolab.vercel.app"
  : "localhost";
export const origin = isProduction ? `https://${rpID}` : `http://${rpID}`;
export const expectedOrigin = isProduction ? origin : `${origin}:3000`;
export const timeout = 60000;
