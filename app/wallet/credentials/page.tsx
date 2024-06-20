import { AddCredentialButton } from "./components/AddCredential/Button";
import { MyNumberCard } from "./components/CredentialsCard";

export default () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 mx-10">
      <header className="w-full max-w-md mt-12 space-y-3 flex flex-col">
        <h1 className="text-3xl font-bold">クレデンシャル</h1>
        <p className="text-gray-300">クレデンシャルをタップして提示します</p>
      </header>
      <div className="flex-grow mt-6 flex flex-col gap-6">
        <MyNumberCard
          name="山田 太郎"
          address="東京都渋谷区渋谷1-2-3"
          birthdate="1990-01-01"
          gender="男性"
        />
        <AddCredentialButton
          onClick={() => {
            console.log("clicked");
          }}
        />
      </div>
    </main>
  );
};
