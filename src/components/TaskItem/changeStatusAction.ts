"use server";

import { Task, TaskStatus } from "@/server/types";
import { request } from "@/utils";
import { revalidateTag } from "next/cache";

export const changeStatusAction = async (task: Task) => {
  const res = await request(`tasks/${task.id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...task,
      status:
        task.status === TaskStatus.OPEN
          ? TaskStatus.IN_PROGRESS
          : TaskStatus.DONE,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  revalidateTag("task");
};
