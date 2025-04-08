import { CreateTask, TaskList, Title } from "@/components";
import { PaginatedResponse, Task, TaskStatus } from "@/server/types";
import { request } from "@/utils";
import { Divider, Flex } from "antd";

export default async function Home() {
  const tasks = ((await (await request("tasks", { next: { tags: ['task'] } })).json() as PaginatedResponse<Task>).items || []).reduce(
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
        <Flex vertical style={{ width: "100%", marginTop: '32px' }} gap={32}>
          <TaskList tasks={tasks[TaskStatus.OPEN]} type={TaskStatus.OPEN} />
          <TaskList
            tasks={tasks[TaskStatus.IN_PROGRESS]}
            type={TaskStatus.IN_PROGRESS}
          />
          <TaskList tasks={tasks[TaskStatus.DONE]} type={TaskStatus.DONE} />
        </Flex>
      </Flex>
    </Flex>
  );
}
