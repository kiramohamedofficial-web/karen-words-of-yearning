import authorPortrait from "@/assets/author-portrait.jpg";

const About = () => {
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
    <section id="about" className="py-20 bg-secondary animate-fade-in delay-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl font-bold text-primary-dark inline-block px-8 bg-secondary relative z-10">
            عن الكاتب
          </h2>
          <div className="absolute top-1/2 right-0 w-full h-0.5 bg-accent z-0"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group animate-fade-in delay-400">
            <div className="rounded-lg overflow-hidden shadow-elegant">
              <img
                src={authorPortrait}
                alt="كريم محمد سالم ابحن"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          <div className="animate-fade-in delay-600">
            <h3 className="text-3xl font-bold text-primary-dark mb-6">سيرة ذاتية</h3>
            <div className="space-y-4 text-lg text-foreground mb-8">
              <p>
                ولد كريم محمد سالم ابحن في مدينة الدار البيضاء بالمغرب عام 1990. نشأ في أسرة محبة للأدب والثقافة، مما غرس فيه حب القراءة والكتابة منذ الصغر.
              </p>
              <p>
                تخرج من كلية الآداب والعلوم الإنسانية بجامعة محمد الخامس، متخصصًا في الأدب العربي الحديث. بدأ نشر كتاباته في الصحف والمجلات الأدبية منذ كان طالبًا في الجامعة.
              </p>
            </div>

            <div className="space-y-6">
              {timelineItems.map((item, index) => (
                <div key={index} className="relative pr-8 border-r-2 border-accent">
                  <div className="absolute -right-2 top-1 w-4 h-4 bg-primary-dark rounded-full"></div>
                  <div className="font-bold text-primary-dark text-lg mb-2">{item.year}</div>
                  <p className="text-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;