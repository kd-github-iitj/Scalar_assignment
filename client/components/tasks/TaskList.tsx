import { Task } from "./types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (!tasks.length) {
    return (
      <div className="text-center text-muted-foreground border rounded-lg py-12">
        <div className="text-3xl">✨</div>
        <div className="mt-3 font-medium text-foreground">No tasks yet</div>
        <div className="mt-1 text-sm">Add your first task to get started — it will be saved in your browser.</div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />)
      )}
    </div>
  );
}
