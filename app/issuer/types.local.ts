export const ISSUER_SERVICE_NAME = "issuer";

export type IssueDataStore =
  | {
      status: "scanQR";
      issueAttributes: {
        name: string;
        address: string;
        birthdate: string;
        gender: string;
      };
    }
  | {
      status: "issued";
    };
