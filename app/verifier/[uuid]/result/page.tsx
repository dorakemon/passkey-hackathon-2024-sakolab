"use client";
import { ReadOnlyMonacoEditor } from "@/components/ReadOnlyMonacoEditor/page";

export default () => {
  return (
    <div className="relative h-screen w-screen">
      <img
        src="/library.jpg"
        alt="Library background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-md p-6 bg-white bg-opacity-80 rounded-lg shadow-lg backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">図書館QRログイン</h1>
            <p className="text-gray-700 mb-6 text-center">
              受け取ったVerifiable
              Presentationの内容を確認し、ログイン可否を判断します。
            </p>
            <ReadOnlyMonacoEditor
              width={400}
              height={500}
              value={{ asdf: "asfd" }}
            />
            <p className="text-red-600 text-center">
              ※ 有効なマイナンバーカードに記載された住所が必要です。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
