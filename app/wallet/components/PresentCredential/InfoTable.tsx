interface PresentCredentialInfoTableProps {
  issueId: string;
  issuerDomain: string;
}

export const PresentCredentialInfoTable = ({
  issueId,
  issuerDomain,
}: PresentCredentialInfoTableProps) => {
  return (
    <table className="w-full mb-6">
      <tbody>
        <tr>
          <td className="font-bold py-2 px-4 align-top text-center text-sm">
            検証ID
          </td>
          <td className="py-2 break-all text-sm">{issueId}</td>
        </tr>
        <tr>
          <td className="font-bold py-2 px-4 align-top text-center text-sm">
            検証者
          </td>
          <td className="py-2 break-all text-sm">{issuerDomain}</td>
        </tr>
        <tr>
          <td className="font-bold py-2 px-4 align-top text-center text-sm">
            要求された属性
          </td>
          <td className="py-2 break-all text-sm">{["address"]}</td>
        </tr>
      </tbody>
    </table>
  );
};
