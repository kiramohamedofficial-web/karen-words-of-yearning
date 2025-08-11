import { useState, useEffect } from "react";
import { Menu, X, PenTool, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: t('home') },
    { href: "#about", label: t('about') },
    { href: "#books", label: t('books') },
    { href: "#blog", label: t('blog') },
    { href: "#contact", label: t('contact') },
  ];

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-smooth ${
        isScrolled 
          ? "bg-primary-dark/95 shadow-glow py-3" 
          : "bg-primary-dark py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 bg-white/5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3 rtl:space-x-reverse group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <PenTool className="w-8 h-8 text-accent" />
            </motion.div>
            <div className="relative">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                {t('authorName')}
              </h1>
              <motion.span 
                className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent rounded-full shadow-sm shadow-accent/50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <nav>
              <ul className="flex space-x-8 rtl:space-x-reverse">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={item.href}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={item.href}
                      className="font-semibold text-white hover:text-accent transition-colors relative group py-2"
                    >
                      {item.label}
                      <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full group-hover:right-auto group-hover:left-0"></span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            
            {/* Theme and Language toggles */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <ThemeToggle />
              <LanguageToggle />
              
              {/* Auth Buttons Placeholder */}
              <motion.div 
                className="flex items-center space-x-2 rtl:space-x-reverse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-white hover:bg-white/10 hover:text-accent"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {t('login')}
                </Button>
                <Button 
                  variant="hero" 
                  size="sm"
                  className="text-white border-accent hover:bg-accent"
                >
                  <User className="w-4 h-4 mr-2" />
                  {t('register')}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
            <ThemeToggle />
            <LanguageToggle />
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hover:text-accent"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav 
            className="md:hidden mt-4 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-3">
              {navItems.map((item) => (
                <motion.li 
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <a
                    href={item.href}
                    className="block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 space-y-2 border-t border-white/10">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:bg-white/10"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  {t('login')}
                </Button>
                <Button 
                  variant="hero" 
                  className="w-full justify-start"
                >
                  <User className="w-4 h-4 mr-2" />
                  {t('register')}
                </Button>
              </div>
            </ul>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;