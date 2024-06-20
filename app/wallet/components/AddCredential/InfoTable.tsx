interface AddCredentialInfoTableProps {
  issueId: string;
  issuerDomain: string;
}

export const AddCredentialInfoTable = ({
  issueId,
  issuerDomain,
}: AddCredentialInfoTableProps) => {
  return (
    <table className="w-full mb-6">
      <tbody>
        <tr>
          <td className="font-bold py-2 px-4 align-top text-center text-sm">
            発行ID
          </td>
          <td className="py-2 break-all text-sm">{issueId}</td>
        </tr>
        <tr>
          <td className="font-bold py-2 px-4 align-top text-center text-sm">
            発行者
          </td>
          <td className="py-2 break-all text-sm">{issuerDomain}</td>
        </tr>
      </tbody>
    </table>
  );
};
