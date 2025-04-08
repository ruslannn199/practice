"use server";

import { request } from "@/utils";
import { revalidateTag } from "next/cache";

export const deleteTaskAction = async (id: string) => {
  await request(`tasks/${id}`, {
    method: "DELETE",
  });
  revalidateTag("task");
};
