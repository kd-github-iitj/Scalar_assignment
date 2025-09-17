import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks by title..."
        className="pl-9 rounded-full shadow-sm"
        aria-label="Search tasks"
      />
    </div>
  );
}
