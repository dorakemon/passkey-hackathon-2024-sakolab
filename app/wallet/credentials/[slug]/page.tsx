"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { MyNumberCard } from "../../components/CredentialsCard";

import Editor from "@monaco-editor/react";
import { PresentCredentialButton } from "../../components/PresentCredential/Button";

export default ({ params }: { params: { slug: string } }) => {
  console.log(params.slug);
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 mx-10">
      <header className="w-full max-w-md mt-12 space-y-3 flex flex-col">
        <h1 className="text-3xl font-bold">詳細</h1>
        <p className="text-gray-300">証明書を提示することができます</p>
      </header>
      <div className="flex-grow mt-6 flex flex-col gap-6">
        <MyNumberCard
          name="山田 太郎"
          address="東京都渋谷区渋谷1-2-3"
          birthdate="1990-01-01"
          gender="男性"
          // TODO: Fix this link
          link="/wallet/credentials/1"
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>VCの詳細</AccordionTrigger>
            <AccordionContent>
              <Editor
                width="286px"
                height="300px"
                defaultLanguage="json"
                value={JSON.stringify(
                  {
                    name: "山田 太郎",
                    address: "東京都渋谷区渋谷1-2-3",
                    birthdate: "1990-01-01",
                  },
                  null,
                  2,
                )}
                theme="vs-dark"
                options={{
                  hideCursorInOverviewRuler: true,
                  minimap: { enabled: false },
                  lineNumbers: "off",
                  readOnly: true,
                }}
              />
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
