import { Task } from "@/server/types";
import { NotifyManager } from "@/utils";
import { App } from "antd";
import { useEffect } from "react";

export const useNotification = (tasks: Task[]) => {
  const { notification } = App.useApp();
  useEffect(() => {
    const tasksToNotify: string[] = NotifyManager.getAll();

    tasks
      .filter((task) => tasksToNotify.includes(task.id))
      .forEach((task: Task) => {
        notification.info({
          message: "Напоминание",
          description: `Срок выполнения задачи "${
            task.name
          }" истекает ${new Date(task.deadline).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}`,
          placement: "bottomRight",
        });
      });
  }, []);
};
