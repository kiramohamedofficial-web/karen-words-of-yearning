import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import bookNostalgia from "@/assets/book-nostalgia.jpg";
import bookMemory from "@/assets/book-memory.jpg";
import bookWhispers from "@/assets/book-whispers.jpg";

const Books = () => {
  const books = [
    {
      id: 1,
      title: "عندما يعود الحنين",
      year: "2018",
      type: "رواية",
      description: "رواية تحكي قصة شاب يعود إلى مدينته القديمة بعد غياب طويل، ليكتشف أن الذكريات قد تكون أحيانًا أثقل من أن نحملها، وأخف من أن نتركها.",
      cover: bookNostalgia,
    },
    {
      id: 2,
      title: "أطياف الذاكرة",
      year: "2020",
      type: "رواية",
      description: "رحلة عبر ذاكرة بطل الرواية الذي يحاول إعادة تركيب ماضيه المتناثر بين مدن عدة وأشخاص تركوا بصماتهم في حياته.",
      cover: bookMemory,
    },
    {
      id: 3,
      title: "همسات في زمن الصمت",
      year: "2015",
      type: "مجموعة قصصية",
      description: "مجموعة من القصص القصيرة التي تلامس مشاعر الحب والفقدان والأمل في حياة شخصيات عادية تعيش في صمت.",
      cover: bookWhispers,
    },
  ];

  return (
    <section id="books" className="py-20 animate-fade-in delay-400">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          <h2 className="text-4xl font-bold text-primary-dark inline-block px-8 bg-background relative z-10">
            المؤلفات
          </h2>
          <div className="absolute top-1/2 right-0 w-full h-0.5 bg-accent z-0"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <Card 
              key={book.id} 
              className={`group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 animate-fade-in delay-${(index + 2) * 200}`}
            >
              <div className="overflow-hidden rounded-t-lg">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-primary-dark mb-3">{book.title}</h3>
                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                  <span>{book.year}</span>
                  <span>{book.type}</span>
                </div>
                <p className="text-foreground mb-6 line-clamp-3">{book.description}</p>
                <Button className="w-full bg-accent hover:bg-accent/90 text-white transition-smooth">
                  اشتري الآن
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Books;