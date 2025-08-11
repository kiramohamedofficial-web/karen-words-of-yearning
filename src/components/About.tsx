import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import authorPortrait from "@/assets/author-portrait-color.png";

const About = () => {
  const { t } = useLanguage();

  const timelineItems = [
    {
      year: "2015",
      description: 'أصدر أول مجموعة قصصية بعنوان "همسات في زمن الصمت" والتي لاقت استحسان النقاد.',
    },
    {
      year: "2018", 
      description: 'نشر روايته الأولى "عندما يعود الحنين" التي حققت انتشارًا واسعًا بين القراء الشباب.',
    },
    {
      year: "2021",
      description: 'فاز بجائزة الرواية العربية للشباب عن روايته "أطياف الذاكرة".',
    },
  ];

  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-primary-dark inline-block px-8 bg-secondary relative z-10">
            {t('aboutAuthor')}
          </h2>
          <div className="absolute top-1/2 right-0 w-full h-0.5 bg-accent z-0"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-lg overflow-hidden shadow-elegant">
              <img
                src={authorPortrait}
                alt="كريم محمد سالم"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-primary-dark mb-6">{t('biography')}</h3>
            <div className="space-y-4 text-lg text-foreground mb-8">
              <p>
                ولد كريم محمد سالم في مدينة الدار البيضاء بالمغرب عام 1990. نشأ في أسرة محبة للأدب والثقافة، مما غرس فيه حب القراءة والكتابة منذ الصغر.
              </p>
              <p>
                تخرج من كلية الآداب والعلوم الإنسانية بجامعة محمد الخامس، متخصصًا في الأدب العربي الحديث. بدأ نشر كتاباته في الصحف والمجلات الأدبية منذ كان طالبًا في الجامعة.
              </p>
            </div>

            <div className="space-y-6">
              {timelineItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="relative pr-8 border-r-2 border-accent"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <motion.div 
                    className="absolute -right-2 top-1 w-4 h-4 bg-primary-dark rounded-full"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  />
                  <div className="font-bold text-accent text-lg mb-2">{item.year}</div>
                  <p className="text-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;