import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("task-manager.theme.v1", "light");

  useEffect(() => {
    try {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-yellow-400" />
      ) : (
        <Moon className="h-4 w-4 text-muted-foreground" />
      )}
    </Button>
  );
}
