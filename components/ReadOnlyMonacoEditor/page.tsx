"use client";

import Editor from "@monaco-editor/react";

type ReadOnlyMonacoEditorProps = {
  width: number;
  height: number;
  value: unknown;
};

export const ReadOnlyMonacoEditor = ({
  value,
  width,
  height,
}: ReadOnlyMonacoEditorProps) => {
  return (
    <Editor
      width={width}
      height={height}
      defaultLanguage="json"
      value={JSON.stringify(value, null, 2)}
      theme="vs-dark"
      options={{
        hideCursorInOverviewRuler: true,
        minimap: { enabled: false },
        lineNumbers: "off",
        readOnly: true,
      }}
    />
  );
};
