import { Task, TaskStatus } from "@/server/types";
import { Button, Flex } from "antd";
import { ChangeStatus } from "../ChangeStatus";
import styles from "./TaskItem.module.css";
import { BellFilled, DeleteOutlined } from "@ant-design/icons";
import { deleteTaskAction } from "./deleteTaskAction";
import { changeStatusAction } from "./changeStatusAction";
import { NotifyManager } from '@/utils';
type Props = {
  task: Task;
};

export const TaskItem = ({ task }: Props) => {

  const handleDeleteClick = async () => {
    await deleteTaskAction(task.id);
    NotifyManager.remove(task.id);
  };

  const handleChangeStatusClick = async () => {
    if (task.status !== TaskStatus.DONE) {
      await changeStatusAction(task);
    }

    if (task.status === TaskStatus.IN_PROGRESS) {
      NotifyManager.remove(task.id);
    }
  };

  const handleTimerNotification = () => {
    NotifyManager.add(task.id);
  };

  return (
    <Flex vertical className={styles.wrapper} gap={8}>
      <div>{task.name}</div>
      <Flex className={styles.info} justify="space-between">
        <Flex gap={16} align="center">
          <Button
            variant="outlined"
            icon={<ChangeStatus task={task} />}
            onClick={handleChangeStatusClick}
          />
          <div>
            до{" "}
            {new Date(task.deadline).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </Flex>
        <Flex gap={8} align="center">
          <div>Оценка: {task.points}</div>
          {task.status !== TaskStatus.DONE && (
            <Button
              variant="outlined"
              icon={<BellFilled />}
              onClick={handleTimerNotification}
            />
          )}
          <Button
            variant="outlined"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDeleteClick}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
