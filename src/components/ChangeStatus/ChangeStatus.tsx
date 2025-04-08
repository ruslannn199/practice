import { Task, TaskStatus } from '@/server/types';
import { CheckCircleOutlined, PlayCircleFilled, SnippetsOutlined } from '@ant-design/icons';

type Props = {
  task: Task;
}

export const ChangeStatus = ({ task }: Props) => {
  switch (task.status) {
    case TaskStatus.OPEN:
      return <PlayCircleFilled />;
    case TaskStatus.IN_PROGRESS:
      return <SnippetsOutlined />;
    case TaskStatus.DONE:
    default:
      return <CheckCircleOutlined />;
  }
}