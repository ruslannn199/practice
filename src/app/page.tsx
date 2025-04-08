import { CreateTask, Title } from "@/components";
import { PaginatedResponse, Task, TaskStatus } from "@/server/types";
import { request } from "@/utils";
import { Divider, Flex } from "antd";

export default async function Home() {
  const tasks = (await request<PaginatedResponse<Task>>("tasks")).items.reduce(
    (acc: Record<TaskStatus, Task[]>, task) => {
      acc[task.status].push(task);

      return acc;
    },
    {
      [TaskStatus.OPEN]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.DONE]: [],
    }
  );

  console.log("tasks :>> ", tasks);
  return (
    <Flex vertical align="center" style={{ width: "100%" }}>
      <Title />
      <Divider />
      <Flex
        vertical
        style={{ width: "calc(100vw - 64px)", padding: "32px" }}
        align="flex-start"
      >
        <CreateTask />
      </Flex>
    </Flex>
  );
}
