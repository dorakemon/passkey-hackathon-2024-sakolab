import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { MyNumberCard } from "../../components/CredentialsCard";

import { ReadOnlyMonacoEditor } from "@/components/ReadOnlyMonacoEditor/page";
import { PresentCredentialButton } from "../../components/PresentCredential/Button";
import { getUserVCs } from "../../handlers/userStore";
import {
  getVCFromVCId,
  vcToBase4AttributesAndId,
} from "../../handlers/vcViewer";

const fetchOneCredential = async (vcId: string) => {
  // TODO: Fix this user ID
  const vcs = await getUserVCs("b133d4ad-c2b6-4844-9e71-8237b9be4790");
  if (!vcs) {
    return null;
  }
  const vc = getVCFromVCId(vcs, vcId);
  if (!vc) {
    return null;
  }
  return vc;
};

export default async ({ params }: { params: { slug: string } }) => {
  const vc = await fetchOneCredential(params.slug);
  if (!vc) {
    return <div>証明書が見つかりませんでした</div>;
  }

  const base4Attributes = vcToBase4AttributesAndId(vc);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 mx-10">
      <header className="w-full max-w-md mt-12 space-y-3 flex flex-col">
        <h1 className="text-3xl font-bold">詳細</h1>
        <p className="text-gray-300">証明書を提示することができます</p>
      </header>
      <div className="flex-grow mt-6 flex flex-col gap-6">
        <MyNumberCard
          name={base4Attributes.name}
          address={base4Attributes.address}
          birthdate={base4Attributes.birthdate}
          gender={base4Attributes.gender}
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>VCの詳細</AccordionTrigger>
            <AccordionContent>
              <ReadOnlyMonacoEditor width={286} height={300} value={vc} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex-grow" />
        <div className="mb-12">
          <PresentCredentialButton />
        </div>
      </div>
    </main>
  );
};
