import { AddCredentialButton } from "../components/AddCredential/Button";
import { MyNumberCard } from "../components/CredentialsCard";
import { getUserVCs } from "../handlers/userStore";
import { vcToBase4AttributesAndId } from "../handlers/vcViewer";

const fetchCredentials = async () => {
  // TODO: Fix this user ID
  const vcs = await getUserVCs("b133d4ad-c2b6-4844-9e71-8237b9be4790");
  console.log(vcs);
  if (!vcs) {
    return [];
  }
  return vcs;
};

export default async () => {
  const credentials = await fetchCredentials();
  console.log(typeof credentials);
  const base4AttributesAndIdList = credentials.map(vcToBase4AttributesAndId);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 mx-10">
      <header className="w-full max-w-md mt-12 space-y-3 flex flex-col">
        <h1 className="text-3xl font-bold">証明書一覧</h1>
        <p className="text-gray-300">証明書をタップして提示します</p>
      </header>
      <div className="flex-grow mt-6 flex flex-col gap-6">
        {base4AttributesAndIdList.map((attributes) => (
          <MyNumberCard
            link={attributes.id}
            name={attributes.name}
            address={attributes.address}
            birthdate={attributes.birthdate}
            gender={attributes.gender}
          />
        ))}
        <AddCredentialButton
          onClick={() => {
            console.log("clicked");
          }}
        />
      </div>
    </main>
  );
};
