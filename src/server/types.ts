export enum TaskStatus {
  OPEN = "open",
  IN_PROGRESS = "inProgress",
  DONE = "done",
}

export type Task = {
  id: string;
  name: string;
  deadline: Date;
  status: TaskStatus;
  points: number;
};

export type PaginatedResponse<T> = {
  items: T[];
};
