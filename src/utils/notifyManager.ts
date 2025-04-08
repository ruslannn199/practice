export class NotifyManager {
  private constructor() {}

  private static key = "tasks";

  public static getAll = (): string[] => {
    try {
      if (typeof window !== "undefined") {
        const tasks = localStorage.getItem(this.key);

        if (tasks && Array.isArray(JSON.parse(tasks))) {
          return JSON.parse(tasks);
        }
      }
    } catch {
      return [];
    }

    return [];
  };

  public static add = (taskId: string) => {
    const tasks = this.getAll();

    if (tasks.includes(taskId)) {
      return;
    }

    tasks.push(taskId);

    localStorage.setItem(this.key, JSON.stringify(tasks));
  };

  public static remove = (taskId: string) => {
    const tasks = this.getAll();

    if (!tasks.includes(taskId)) {
      return;
    }

    tasks.splice(tasks.indexOf(taskId), 1);

    localStorage.setItem(this.key, JSON.stringify(tasks));
  };
}
