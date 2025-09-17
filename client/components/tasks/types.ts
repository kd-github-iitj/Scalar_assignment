export type TaskFilter = "all" | "completed" | "pending";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
