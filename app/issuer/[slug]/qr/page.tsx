import { QRCode } from "@/components/QRCode";
import { getRedisKey } from "../../servers";

export default async ({ params }: { params: { slug: string } }) => {
  await getRedisKey(params.slug);
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-white">QRの読み取り</h2>
      <p className="mt-2 text-sm text-gray-400">
        Walletアプリから表示されているQRコードをスキャンしてください
      </p>
      <div className="bg-gray-100 p-4 rounded-md mt-6">
        <QRCode value={params.slug} width={256} height={256} />
      </div>
    </div>
  );
};
