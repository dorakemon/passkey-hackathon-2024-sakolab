import type { Metadata } from "next";
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
      {children}
    </main>
  );
};
