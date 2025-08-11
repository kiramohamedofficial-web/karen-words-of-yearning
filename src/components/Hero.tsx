import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-[80vh] flex items-center relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-dark mb-6 leading-tight">
            كريم محمد سالم ابحن
          </h1>
          <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
            كاتب وروائي شاب، يسرد لحظات الألم والحنين بلغةٍ بسيطةٍ مشبعةٍ بالعاطفة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-primary text-primary hover:bg-primary hover:text-white"
              asChild
            >
              <a href="#books">استكشف المؤلفات</a>
            </Button>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-dark"
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