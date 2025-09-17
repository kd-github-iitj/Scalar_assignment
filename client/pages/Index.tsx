import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { TaskForm } from "@/components/tasks/TaskForm";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskFilter } from "@/components/tasks/TaskFilter";
import { SearchBar } from "@/components/tasks/SearchBar";
import { Task, TaskFilter as TFilter } from "@/components/tasks/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { CheckCircle2, ClipboardList, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Index() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("task-manager.tasks.v1", []);
  const [filter, setFilter] = useState<TFilter>("all");
  const [search, setSearch] = useState("");

  // Basic onboarding example content once (only for empty state)
  useEffect(() => {
    if (tasks.length === 0) {
      const demo: Task[] = [
        {
          id: crypto.randomUUID(),
          title: "Welcome to your Task Manager",
          description: "Add, search, filter and track your tasks.",
          completed: false,
          createdAt: Date.now(),
        },
      ];
      setTasks(demo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTask = (input: { title: string; description: string }) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: input.title,
      description: input.description,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  const filteredTasks = useMemo(() => {
    const byFilter = tasks.filter((t) => {
      if (filter === "completed") return t.completed;
      if (filter === "pending") return !t.completed;
      return true;
    });
    const q = search.trim().toLowerCase();
    if (!q) return byFilter;
    return byFilter.filter((t) => t.title.toLowerCase().includes(q));
  }, [tasks, filter, search]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="sticky top-0 z-30 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-primary/60 grid place-items-center text-primary-foreground shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold">TaskFlow</div>
              <div className="text-xs text-muted-foreground">Manage your day — fast and simple</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm text-foreground/90 shadow-sm">
              <ClipboardList className="h-4 w-4" /> <span className="font-medium">{tasks.length}</span>
              <span className="text-muted-foreground ml-1">tasks</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm text-foreground/90 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500" /> <span className="font-medium">{completedCount}</span>
              <span className="text-muted-foreground ml-1">done</span>
            </div>
            <div>
              {/* Theme toggle */}
              <div className="ml-1">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <section>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold">Your Tasks</h1>
                <p className="mt-1 text-sm text-muted-foreground">Quickly add, search and filter tasks. Your data is saved locally.</p>
              </div>
              <div className="hidden sm:block w-80">
                <SearchBar value={search} onChange={setSearch} />
              </div>
            </div>

            <div className="mt-6">
              <Card className="border-primary/10 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Add a new task</CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskForm onAdd={addTask} />
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1 block sm:hidden">
                <SearchBar value={search} onChange={setSearch} />
              </div>
              <TaskFilter value={filter} onChange={setFilter} />
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <p>
                Showing <span className="font-medium text-foreground">{filteredTasks.length}</span> of
                <span className="font-medium text-foreground"> {tasks.length}</span> tasks
              </p>
              <div className="flex items-center gap-3">
                <span className="hidden md:inline">{pendingCount} pending • {completedCount} completed</span>
                <Separator orientation="vertical" className="hidden md:block" />
                <Button variant="outline" size="sm" onClick={clearCompleted} disabled={completedCount === 0}>
                  Clear completed
                </Button>
              </div>
            </div>

            <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
          </section>
        </div>
      </main>

      <footer className="container py-8 text-center text-xs text-muted-foreground">
        <p>Built with ❤️ using React Hooks • LocalStorage • TailwindCSS</p>
      </footer>
    </div>
  );
}
