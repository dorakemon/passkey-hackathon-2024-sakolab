import { JsonLd } from "jsonld/jsonld-spec";
import { CONTEXTS, customDocumentLoader } from "../data";

const defaultDocumentLoader = customDocumentLoader(
  new Map(CONTEXTS.map(([k, v]) => [k, JSON.parse(v) as JsonLd])),
);

const _documentLoader = () => {
  const contexts = new Map(CONTEXTS);
  const contextsValidated = new Map<string, boolean>(
    CONTEXTS.map(([k, _]) => [k, true]),
  );
  // TODO: ここのenableRemoteはデモの都合でfalseにする
  const enableRemote = false;

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
};

export const documentLoader = _documentLoader();
