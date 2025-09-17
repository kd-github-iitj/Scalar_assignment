import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Task } from "./types";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className={
      "flex items-start gap-3 rounded-lg p-4 transition-transform transition-shadow hover:shadow-lg hover:-translate-y-0.5 " +
      (task.completed
        ? "bg-gradient-to-r from-green-50 to-white border border-green-200 border-l-4 border-green-400"
        : "bg-card border border-border border-l-4 border-primary/60")
    }>
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
        className="mt-1 scale-100 transition-transform hover:scale-105"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h3
            className={
              "font-medium text-foreground truncate " +
              (task.completed ? "line-through text-muted-foreground" : "")
            }
            title={task.title}
          >
            {task.title}
          </h3>
          <time className="text-xs text-muted-foreground shrink-0 ml-2">
            {new Date(task.createdAt).toLocaleString()}
          </time>
        </div>

        {task.description ? (
          <p
            className={
              "text-sm mt-1 truncate " +
              (task.completed ? "line-through text-muted-foreground" : "text-muted-foreground")
            }
            title={task.description}
          >
            {task.description}
          </p>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
