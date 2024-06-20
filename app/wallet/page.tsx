import { Button } from "@/components/ui/button";

export default () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 mx-10 relative">
        <div className="w-full max-w-md rounded-lg">
          <div className="flex justify-center mb-24">
            <img
              src="/Sakolab.png"
              alt="Illustration"
              width={200}
              height={200}
              className="rounded-md"
            />
          </div>
          <h1 className="text-3xl font-bold">Sako Lab Wallet</h1>
          <p className="text-gray-300 mb-10">
            PassKeyとVCを使ったデモアプリです
          </p>
          <div className="flex justify-center mt-12">
            <Button className="text-white w-full">
              <a
                href="/wallet/auth/register"
                className="flex flex-row items-center gap-4 font-bold"
              >
                開始する
              </a>
            </Button>
          </div>
          <p className="absolute bottom-5 w-full text-red-500 text-center">
            * 本アプリはGoogle Passkey Hackathon 2024のためのデモ用です
          </p>
        </div>
      </div>
    </main>
  );
};
