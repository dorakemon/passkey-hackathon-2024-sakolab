import { QRCode } from "@/components/QRCode";

export default ({ params }: { params: { slug: string } }) => {
  console.log(params.slug);
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-white">QRの表示</h2>
      <p className="mt-2 text-sm text-gray-400">
        Walletアプリから表示されているQRコードをスキャンしてください
      </p>
      <div className="bg-gray-100 p-4 rounded-md mt-6">
        <QRCode value={params.slug} width={256} height={256} />
      </div>
    </div>
  );
};
