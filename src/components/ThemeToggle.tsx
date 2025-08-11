import { Moon, Sun, Monitor, Palette, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/hooks/use-theme"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem] text-accent" />
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem] text-accent" />
      default:
        return <Monitor className="h-[1.2rem] w-[1.2rem] text-accent" />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "نهاري"
      case "dark":
        return "ليلي"
      default:
        return "تلقائي"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10 hover:text-accent relative group transition-smooth"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {getThemeIcon()}
          </motion.div>
          <motion.div
            className="absolute -top-2 -right-2 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="sr-only">تبديل المظهر</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-md border border-border/50 shadow-elegant">
        <DropdownMenuLabel className="flex items-center gap-2 text-foreground">
          <Palette className="w-4 h-4 text-accent" />
          <span>مظاهر الموقع</span>
          <Badge variant="secondary" className="text-xs">جديد</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <DropdownMenuItem 
            onClick={() => setTheme("light")} 
            className={`cursor-pointer flex items-center gap-3 py-3 ${theme === "light" ? "bg-accent/10 text-accent font-medium" : ""}`}
          >
            <Sun className="w-4 h-4" />
            <div className="flex flex-col">
              <span>المظهر النهاري</span>
              <span className="text-xs text-muted-foreground">مناسب للقراءة اليومية</span>
            </div>
            {theme === "light" && <Badge className="mr-auto">نشط</Badge>}
          </DropdownMenuItem>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <DropdownMenuItem 
            onClick={() => setTheme("dark")} 
            className={`cursor-pointer flex items-center gap-3 py-3 ${theme === "dark" ? "bg-accent/10 text-accent font-medium" : ""}`}
          >
            <Moon className="w-4 h-4" />
            <div className="flex flex-col">
              <span>المظهر الليلي</span>
              <span className="text-xs text-muted-foreground">مريح للعين في الظلام</span>
            </div>
            {theme === "dark" && <Badge className="mr-auto">نشط</Badge>}
          </DropdownMenuItem>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <DropdownMenuItem 
            onClick={() => setTheme("system")} 
            className={`cursor-pointer flex items-center gap-3 py-3 ${theme === "system" ? "bg-accent/10 text-accent font-medium" : ""}`}
          >
            <Monitor className="w-4 h-4" />
            <div className="flex flex-col">
              <span>تلقائي</span>
              <span className="text-xs text-muted-foreground">يتبع إعدادات النظام</span>
            </div>
            {theme === "system" && <Badge className="mr-auto">نشط</Badge>}
          </DropdownMenuItem>
        </motion.div>
        
        <DropdownMenuSeparator />
        
        <motion.div whileHover={{ scale: 1.02 }}>
          <DropdownMenuItem className="cursor-pointer flex items-center gap-3 text-muted-foreground">
            <Settings className="w-4 h-4" />
            <div className="flex flex-col">
              <span>إعدادات متقدمة</span>
              <span className="text-xs">قريباً...</span>
            </div>
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}