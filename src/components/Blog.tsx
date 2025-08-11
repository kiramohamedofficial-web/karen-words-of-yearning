import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "فن الكتابة بين العاطفة والتقنية",
      date: "15 يونيو 2023",
      category: "مقالات",
      excerpt: "كيف يمكن للكاتب أن يوازن بين المشاعر الجياشة والأساليب التقنية في الكتابة؟ مقال عن تجربتي الشخصية في هذا المجال.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "لماذا نقرأ؟ رحلة في عوالم الكتب",
      date: "2 مايو 2023",
      category: "خواطر",
      excerpt: "تأملات في قيمة القراءة ودورها في تشكيل وعينا وتوسيع آفاقنا، وكيف يمكن للكتب أن تكون جسورًا بين الثقافات.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "أين يختبئ الإلهام؟ نصائح للكتّاب المبتدئين",
      date: "18 مارس 2023",
      category: "نصائح",
      excerpt: "الإلهام ليس سحابة عابرة، بل هو نتاج عمل وجهد يومي. في هذا المقال، أشارك بعض النصائح التي ساعدتني في رحلتي الكتابية.",
      image: "https://images.unsplash.com/photo-1510172951991-856a62a9e395?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="blog" className="py-20 animate-fade-in delay-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl font-bold text-primary-dark inline-block px-8 bg-background relative z-10">
            أحدث المقالات
          </h2>
          <div className="absolute top-1/2 right-0 w-full h-0.5 bg-primary z-0"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card 
              key={post.id} 
              className={`group hover:shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in delay-${(index + 2) * 200}`}
            >
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
                  <span>{post.date}</span>
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3 leading-tight">
                  {post.title}
                </h3>
                <p className="text-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors group"
                >
                  اقرأ المزيد
                  <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;