"use client";

import { Task, TaskStatus } from "@/server/types";
import { List } from "antd";
import Item from "antd/es/list/Item";
import { TaskItem } from "../TaskItem";

type Props = {
  tasks: Task[];
  type: TaskStatus;
};

const taskTranslations = {
  [TaskStatus.OPEN]: "Открыто",
  [TaskStatus.IN_PROGRESS]: "В работе",
  [TaskStatus.DONE]: "Завершено",
};

export const TaskList = ({ tasks, type }: Props) => {
  return (
    <List
      dataSource={tasks}
      header={<h2>{taskTranslations[type]}</h2>}
      size="large"
      bordered
      renderItem={(task) => (
        <Item key={task.id}>
          <TaskItem task={task} />
        </Item>
      )}
    />
  );
};
