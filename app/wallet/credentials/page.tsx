import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AddCredentialButton } from "../components/AddCredential/Button";
import { MyNumberCard } from "../components/CredentialsCard";
import { getUserVCs } from "../handlers/userStore";
import { vcToBase4AttributesAndId } from "../handlers/vcViewer";

const fetchCredentials = async (userId: string) => {
  const vcs = await getUserVCs(userId);
  if (!vcs) {
    return [];
  }
  return vcs;
};

export default async () => {
  const cookieStore = cookies();
  const userId = cookieStore.get("wallet-user-id");
  if (!userId) {
    redirect("/wallet/auth/login");
  }

  const credentials = await fetchCredentials(userId.value);

  const base4AttributesAndIdList = credentials.map(vcToBase4AttributesAndId);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 mx-10">
      <header className="w-full max-w-md mt-12 space-y-3 flex flex-col">
        <h1 className="text-3xl font-bold">証明書一覧</h1>
        <p className="text-gray-300">証明書をタップして提示します</p>
      </header>
      <div className="flex-grow mt-6 flex flex-col gap-6">
        {base4AttributesAndIdList.map((attributes, index) =>
          index > 0 ? (
            <MyNumberCard
              link={attributes.id}
              name={attributes.name}
              address={attributes.address}
              birthdate={attributes.birthdate}
              gender={attributes.gender}
            />
          ) : (
            <></>
          ),
        )}
        <AddCredentialButton
          onClick={() => {
            console.log("clicked");
          }}
        />
      </div>
    </main>
  );
};
