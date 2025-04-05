
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden relative hover:scale-110 transition-transform duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-brand-primary" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-white" />
          <span className="sr-only">Toggle theme</span>
          <div className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-in fade-in duration-300">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer hover:bg-brand-primary/10">
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer hover:bg-brand-primary/10">
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer hover:bg-brand-primary/10">
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
