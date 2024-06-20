import { redirect } from "next/navigation";

import { v4 as uuidv4 } from "uuid";

export default () => {
  const uuid = uuidv4();
  redirect(`/verifier/${uuid}`);
};
