"use server";

import { Task } from "@/server/types";
import { request } from "@/utils";
import { revalidateTag } from "next/cache";

export const createTaskAction = async (
  body: Omit<Task, "id" | "deadline"> & { deadline: string }
) => {
  await request("tasks", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  revalidateTag("task");
};
