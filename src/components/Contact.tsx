import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Twitter, Instagram, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إرسال الرسالة",
      description: "شكرًا لك على التواصل معي. سأرد عليك قريبًا.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "تويتر" },
    { icon: Facebook, href: "#", label: "فيسبوك" },
    { icon: Instagram, href: "#", label: "إنستغرام" },
    { icon: BookOpen, href: "#", label: "جودريدز" },
  ];

  return (
    <section id="contact" className="py-20 bg-primary text-primary-foreground animate-fade-in delay-800">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm shadow-glow border-white/20">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-12 relative">
              <h2 className="text-4xl font-bold text-white inline-block px-8 bg-white/10 backdrop-blur-sm relative z-10 rounded-lg">
                تواصل معي
              </h2>
              <div className="absolute top-1/2 right-0 w-full h-0.5 bg-accent z-0"></div>
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-semibold">
                  الاسم الكامل
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-accent focus:ring-accent/30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-semibold">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-accent focus:ring-accent/30"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="subject" className="text-white font-semibold">
                  الموضوع
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-accent focus:ring-accent/30"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="message" className="text-white font-semibold">
                  الرسالة
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-accent focus:ring-accent/30 resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent/90 text-white transition-smooth shadow-glow"
                >
                  إرسال الرسالة
                </Button>
              </div>
            </form>

            <div className="flex justify-center space-x-4 rtl:space-x-reverse mt-12">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-1 border border-white/30"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;