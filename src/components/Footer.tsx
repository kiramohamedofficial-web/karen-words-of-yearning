import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Twitter, Facebook, Instagram, Youtube, Linkedin, Github } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { href: "#home", label: t('home') },
    { href: "#about", label: t('about') },
    { href: "#books", label: t('books') },
    { href: "#blog", label: t('blog') },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/karimsalem", label: "Twitter", color: "hover:text-blue-400" },
    { icon: Facebook, href: "https://facebook.com/karimsalem", label: "Facebook", color: "hover:text-blue-600" },
    { icon: Instagram, href: "https://instagram.com/karimsalem", label: "Instagram", color: "hover:text-pink-500" },
    { icon: Youtube, href: "https://youtube.com/@karimsalem", label: "YouTube", color: "hover:text-red-500" },
    { icon: Linkedin, href: "https://linkedin.com/in/karimsalem", label: "LinkedIn", color: "hover:text-blue-700" },
    { icon: Github, href: "https://github.com/karimsalem", label: "GitHub", color: "hover:text-gray-400" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 relative">
              {t('aboutBlog')}
              <span className="absolute bottom-0 right-0 w-12 h-0.5 bg-accent"></span>
            </h3>
            <p className="leading-relaxed text-gray-300 mb-6">
              هذه المدونة الشخصية للكاتب كريم محمد سالم، تهدف إلى مشاركة أفكاره، مؤلفاته، وخبراته مع القراء والمهتمين بالأدب والكتابة.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 relative">
              {t('quickLinks')}
              <span className="absolute bottom-0 right-0 w-12 h-0.5 bg-accent"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="hover:text-accent transition-colors duration-300 hover:-translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 relative">
              {t('newsletter')}
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
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 relative">
              {t('followMe')}
              <span className="absolute bottom-0 right-0 w-12 h-0.5 bg-accent"></span>
            </h3>
            <p className="mb-6 text-gray-300">
              تابعني على منصات التواصل الاجتماعي لآخر الأخبار والمقالات والإصدارات الجديدة.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 ${social.color} hover:shadow-lg`}
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            &copy; 2023 كريم محمد سالم. {t('allRightsReserved')}
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;