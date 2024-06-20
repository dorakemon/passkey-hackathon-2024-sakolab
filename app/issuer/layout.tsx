import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Passkey Hackathon 2024 Issuer",
  description:
    "Issuer Demo for Passkey Hackathon 2024 @GoogleJapan Originated By Sakolab in Waseda University",
};

export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex h-screen w-full">
        <div className="w-1/2 h-full hidden lg:block">
          <img
            src="/id.webp"
            alt="ID Card Demo"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full lg:w-1/2 h-full flex items-center justify-center bg-gray-900">
          <div className="max-w-lg w-full space-y-8 p-10">{children}</div>
        </div>
      </div>
    </main>
  );
};
