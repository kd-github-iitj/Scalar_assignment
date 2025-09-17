import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskFilter as TFilter } from "./types";

interface TaskFilterProps {
  value: TFilter;
  onChange: (value: TFilter) => void;
}

export function TaskFilter({ value, onChange }: TaskFilterProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as TFilter)}>
      <TabsList className="w-full md:w-auto">
        <TabsTrigger value="all" className="flex-1 md:flex-none">All</TabsTrigger>
        <TabsTrigger value="pending" className="flex-1 md:flex-none">Pending</TabsTrigger>
        <TabsTrigger value="completed" className="flex-1 md:flex-none">Completed</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
