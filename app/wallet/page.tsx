"use client";

import { useMemo, useState } from "react";
import {
  CONTEXTS,
  customDocumentLoader,
  exampleKeyPairs,
} from "../../libs/vc/data";
import { exampleDocs } from "../../libs/vc/data/doc";
import { generateVC } from "../../libs/vc/handlers/sign";

import { JsonLd } from "jsonld/jsonld-spec";

export default () => {
  const [contexts, setContexts] = useState(new Map(CONTEXTS));
  const [contextsValidated, setContextsValidated] = useState(
    new Map<string, boolean>(CONTEXTS.map(([k, _]) => [k, true])),
  );
  const [enableRemote, setEnableRemote] = useState(false);

  const defaultDocumentLoader = customDocumentLoader(
    new Map(CONTEXTS.map(([k, v]) => [k, JSON.parse(v) as JsonLd])),
  );
  const documentLoader = useMemo(() => {
    // const contexts = new Map(CONTEXTS);
    // const contextsValidated = new Map<string, boolean>(
    //   CONTEXTS.map(([k, _]) => [k, true]),
    // );
    // // TODO: ここのenableRemoteはデモの都合でfalseにする
    // const enableRemote = false;

    try {
      const validatedContexts = [...contexts.entries()].filter(([k, _]) =>
        contextsValidated.get(k),
      );
      const parsedValidatedContextsPairs: [string, JsonLd][] =
        validatedContexts.map(([k, v]) => [k, JSON.parse(v) as JsonLd]);
      const parsedValidatedContexts = new Map(parsedValidatedContextsPairs);

      return customDocumentLoader(parsedValidatedContexts, enableRemote);
    } catch {
      return defaultDocumentLoader;
    }
  }, []);

  const generateVCHandler = async () => {
    const vcResult = await generateVC(
      JSON.stringify(exampleDocs.get("Person1")),
      exampleKeyPairs,
      documentLoader,
    );
    console.log(vcResult);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>This is Wallet Home</div>
      <button className="btn" onClick={generateVCHandler}>
        Issue VC
      </button>
    </main>
  );
};
