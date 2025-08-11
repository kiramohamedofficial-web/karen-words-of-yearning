import { useState, useEffect } from "react";
import { Menu, X, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#home", label: "الرئيسية" },
    { href: "#about", label: "عن الكاتب" },
    { href: "#books", label: "المؤلفات" },
    { href: "#blog", label: "المدونة" },
    { href: "#contact", label: "اتصل بي" },
  ];

  return (
    <header className={`fixed w-full z-50 transition-smooth ${
      isScrolled 
        ? "bg-primary-dark/95 shadow-glow py-3" 
        : "bg-primary-dark py-4"
    }`}>
      <div className="absolute inset-0 bg-white/5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse group">
            <PenTool className="w-8 h-8 animate-float text-accent" />
            <div className="relative">
              <h1 className="text-2xl font-bold text-white">كريم ابحن</h1>
              <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent rounded-full shadow-sm shadow-accent/50"></span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8 rtl:space-x-reverse">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-semibold text-white hover:text-accent transition-colors relative group py-2"
                  >
                    {item.label}
                    <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full group-hover:right-auto group-hover:left-0"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-white/10 hover:text-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4">
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block py-2 px-4 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;