import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
      style={{
        backgroundImage: `var(--gradient-hero), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-down">
            كريم محمد سالم ابحن
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed animate-fade-in opacity-0 delay-400">
            كاتب وروائي شاب، يسرد لحظات الألم والحنين بلغةٍ بسيطةٍ مشبعةٍ بالعاطفة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-primary-dark transition-smooth"
              asChild
            >
              <a href="#books">استكشف المؤلفات</a>
            </Button>
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-white transition-smooth shadow-glow"
              asChild
            >
              <a href="#contact">تواصل معي</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;