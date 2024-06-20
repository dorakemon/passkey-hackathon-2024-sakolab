"use server";

import { RedisDB } from "@/libs/redis";
import { redirect } from "next/navigation";

import { v4 as uuidv4 } from "uuid";
import { ISSUER_SERVICE_NAME, IssueDataStore } from "../types.local";

export const formPostAction = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const birthdate = formData.get("birthdate") as string;
  const gender = formData.get("gender") as string;

  if (!name || !address || !birthdate || !gender) {
    throw new Error("Invalid form data");
  }

  const issueId = uuidv4();

  await RedisDB.Instance.set<IssueDataStore>(ISSUER_SERVICE_NAME, issueId, {
    status: "scanQR",
    issueAttributes: {
      name,
      address,
      birthdate,
      gender,
    },
  });

  redirect(`/issuer/${issueId}/qr`);
};

export const getRedisKey = async (uuid: string) => {
  const data = await RedisDB.Instance.get(ISSUER_SERVICE_NAME, uuid);

  if (data) {
    redirect(`/verifier/${uuid}/result`);
  }
};
