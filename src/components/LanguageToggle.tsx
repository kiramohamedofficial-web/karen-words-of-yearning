import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/hooks/use-language"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-accent">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border-white/20">
        <DropdownMenuItem 
          onClick={() => setLanguage("ar")} 
          className={`cursor-pointer ${language === 'ar' ? 'bg-accent/10' : ''}`}
        >
          <span className="mr-2">🇸🇦</span>
          <span>العربية</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage("en")} 
          className={`cursor-pointer ${language === 'en' ? 'bg-accent/10' : ''}`}
        >
          <span className="mr-2">🇺🇸</span>
          <span>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}