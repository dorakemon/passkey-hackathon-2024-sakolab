import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { KeyRound } from "lucide-react";

export default () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 mx-10">
      <header className="w-full max-w-md mt-12 space-y-3 flex flex-col">
        <h1 className="text-3xl font-bold">ログイン</h1>
        <p className="text-gray-300">PassKeyで、 Walletにログインしましょう</p>
      </header>

      <Card className="w-full mt-10 p-4 bg-slate-900">
        <CardContent className="w-full max-w-md space-y-3 flex flex-col pt-4">
          <Button size="lg" className="w-full py-2 text-md flex flex-row gap-2">
            <KeyRound />
            PassKeyでログイン
          </Button>
          <div className="flex justify-center mt-4">
            もしくは　
            <a href="/wallet/auth/register" className="text-blue-400 underline">
              登録
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
