import { motion } from "framer-motion";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const ThemePreview = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      name: "light",
      label: "نهاري",
      icon: Sun,
      description: "مظهر فاتح ومريح للعين",
      colors: ["#ffffff", "#f7f8fa", "#e6b547"],
    },
    {
      name: "dark", 
      label: "ليلي",
      icon: Moon,
      description: "مظهر داكن وأنيق",
      colors: ["#0f1419", "#1e2a47", "#e6b547"],
    },
    {
      name: "system",
      label: "تلقائي", 
      icon: Monitor,
      description: "يتبع إعدادات النظام",
      colors: ["#6b7280", "#9ca3af", "#e6b547"],
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {themes.map((themeOption, index) => {
        const IconComponent = themeOption.icon;
        const isActive = theme === themeOption.name;
        
        return (
          <motion.div
            key={themeOption.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-hover ${
                isActive ? "ring-2 ring-accent shadow-glow" : "hover:shadow-elegant"
              }`}
              onClick={() => setTheme(themeOption.name as "light" | "dark" | "system")}
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <motion.div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                      isActive ? "bg-accent text-accent-foreground" : "bg-muted"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-8 h-8" />
                  </motion.div>
                  
                  {isActive && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      <Check className="w-3 h-3" />
                    </motion.div>
                  )}
                </div>
                
                <h3 className={`text-lg font-semibold mb-2 ${isActive ? "text-accent" : ""}`}>
                  {themeOption.label}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {themeOption.description}
                </p>
                
                <div className="flex justify-center gap-2 mb-4">
                  {themeOption.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                <Button 
                  variant={isActive ? "default" : "outline"} 
                  size="sm"
                  className="w-full"
                >
                  {isActive ? "نشط" : "تطبيق"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ThemePreview;