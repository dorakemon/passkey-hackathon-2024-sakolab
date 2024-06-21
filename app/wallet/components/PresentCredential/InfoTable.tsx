interface PresentCredentialInfoTableProps {
  verifierChallenge: string;
  issuerDomain: string;
  requestAttributes: string[];
}

export const PresentCredentialInfoTable = ({
  verifierChallenge,
  verifierDomain,
  requestAttributes,
}: PresentCredentialInfoTableProps) => {
  return (
    <table className="w-full mb-6">
      <tbody>
        <tr>
          <td className="font-bold py-2 px-4 align-top text-center text-sm">
            チャレンジ
          </td>
          <td className="py-2 break-all text-sm">{verifierChallenge}</td>
        </tr>
        <tr>
          <td className="font-bold py-2 px-4 align-top text-center text-sm">
            検証者
          </td>
          <td className="py-2 break-all text-sm">{verifierDomain}</td>
        </tr>
        <tr>
          <td className="font-bold py-2 px-4 align-top text-center text-sm">
            要求された属性
          </td>
          <td className="py-2 break-all text-sm">
            {requestAttributes.join(". ")}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
