"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { KeyRound } from "lucide-react";
import { useFidoClient } from "../hooks/useFidoClient";

export default () => {
  const { handleRegistration } = useFidoClient();
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 mx-10">
      <header className="w-full max-w-md mt-12 space-y-3 flex flex-col">
        <h1 className="text-3xl font-bold">アカウントの作成</h1>
        <p className="text-gray-300">PassKeyで、Walletを作成しましょう</p>
      </header>

      <Card className="w-full mt-7 bg-slate-900">
        <CardHeader>
          <CardTitle>ユーザーネーム</CardTitle>
        </CardHeader>
        <form action={handleRegistration}>
          <CardContent>
            <Input
              placeholder="メールアドレス"
              type="email"
              name="email"
              required
              className="h-12"
            />
          </CardContent>
          <CardFooter className="w-full max-w-md space-y-3 flex flex-col">
            <Button
              size="lg"
              className="w-full py-2 text-md flex flex-row gap-2 px-12"
              type="submit"
            >
              <KeyRound />
              PassKeyの登録
            </Button>
            <div className="flex justify-center mt-4">
              もしくは　
              <a href="/wallet/auth/login" className="text-blue-400 underline">
                ログイン
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
};
