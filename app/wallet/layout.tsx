import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import "./wallet.css";

export const metadata: Metadata = {
  title: "Passkey Hackathon 2024 Wallet",
  description:
    "Wallet Demo for Passkey Hackathon 2024 @GoogleJapan Originated By Sakolab in Waseda University",
};

export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/Sakolab.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/Sakolab.png" />
      </head>
      <CookiesProvider>{children}</CookiesProvider>
    </main>
  );
};
