import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme-context";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      data-testid="button-toggle-theme"
      className="rounded-lg"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" data-testid="icon-moon" />
      ) : (
        <Sun className="h-5 w-5" data-testid="icon-sun" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
