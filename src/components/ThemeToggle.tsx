import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Moon, Palette, Sun } from "lucide-react";

type AppTheme = "light" | "white" | "dark";

const THEME_LABEL: Record<AppTheme, string> = {
  light: "Crème",
  white: "Blanc",
  dark: "Sombre",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const currentTheme: AppTheme =
    theme === "dark" ? "dark" : theme === "white" ? "white" : "light";

  const Icon = currentTheme === "dark" ? Moon : currentTheme === "white" ? Palette : Sun;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Changer le thème">
          <Icon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {(Object.keys(THEME_LABEL) as AppTheme[]).map((t) => (
          <DropdownMenuItem key={t} onClick={() => setTheme(t)} className="cursor-pointer">
            <span className="flex-1">{THEME_LABEL[t]}</span>
            {currentTheme === t && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

