import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { ThreeScene } from "@/components/ThreeScene";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const { t } = useLanguage();

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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <motion.div className="text-center mb-8">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {t('authorName')}
              </motion.h1>
              <motion.p 
                className="text-2xl md:text-3xl text-accent font-semibold mb-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {t('authorSubtitle')}
              </motion.p>
              <motion.p 
                className="text-xl md:text-2xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {t('heroDescription')}
              </motion.p>
            </motion.div>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="border-accent text-accent hover:bg-accent hover:text-primary-dark transition-smooth font-semibold"
                asChild
              >
                <a href="#books">{t('exploreBooks')}</a>
              </Button>
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent-light text-primary-dark transition-smooth shadow-glow font-semibold"
                asChild
              >
                <a href="#books">{t('readBooks')}</a>
              </Button>
            </motion.div>
          </div>
          
          {/* 3D Scene */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <ThreeScene />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;