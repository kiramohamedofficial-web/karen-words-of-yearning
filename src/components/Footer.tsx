import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { href: "#home", label: "الرئيسية" },
    { href: "#about", label: "عن الكاتب" },
    { href: "#books", label: "المؤلفات" },
    { href: "#blog", label: "المدونة" },
    { href: "#contact", label: "اتصل بي" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative">
              عن المدونة
              <span className="absolute bottom-0 right-0 w-12 h-0.5 bg-accent"></span>
            </h3>
            <p className="leading-relaxed text-gray-300">
              هذه المدونة الشخصية للكاتب كريم محمد سالم ابحن، تهدف إلى مشاركة أفكاره، مؤلفاته، وخبراته مع القراء والمهتمين بالأدب والكتابة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative">
              روابط سريعة
              <span className="absolute bottom-0 right-0 w-12 h-0.5 bg-accent"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-accent transition-colors duration-300 hover:-translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative">
              النشرة البريدية
              <span className="absolute bottom-0 right-0 w-12 h-0.5 bg-accent"></span>
            </h3>
            <p className="mb-6 text-gray-300">
              اشترك في نشرتنا البريدية لتكون أول من يعرف عن إصداراتي الجديدة والفعاليات القادمة.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-accent hover:bg-accent/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p>&copy; 2023 كريم محمد سالم ابحن. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;