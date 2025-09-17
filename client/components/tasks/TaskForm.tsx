import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

interface TaskFormProps {
  onAdd: (task: { title: string; description: string }) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    onAdd({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-1">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Prepare project brief"
            aria-invalid={!!error}
            className="shadow-sm"
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some details to this task"
            rows={1}
            className="shadow-sm"
          />
        </div>
      </div>
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : null}
      <div className="flex justify-end">
        <Button type="submit" className="px-6" variant="default">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>
    </form>
  );
}
