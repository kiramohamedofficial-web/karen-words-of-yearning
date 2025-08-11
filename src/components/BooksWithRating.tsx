import { useState } from "react";
import { Star, Download, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import bookNostalgia from "@/assets/book-nostalgia.jpg";
import bookMemory from "@/assets/book-memory.jpg";
import bookWhispers from "@/assets/book-whispers.jpg";

interface BookRating {
  bookId: number;
  rating: number;
  totalRatings: number;
  userRating: number;
}

const StarRating = ({ rating, onRate, interactive = false }: { 
  rating: number; 
  onRate?: (rating: number) => void;
  interactive?: boolean;
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          className={`${interactive ? 'cursor-pointer' : 'cursor-default'} transition-colors`}
          onMouseEnter={() => interactive && setHoveredRating(star)}
          onMouseLeave={() => interactive && setHoveredRating(0)}
          onClick={() => interactive && onRate?.(star)}
          whileHover={interactive ? { scale: 1.1 } : {}}
          whileTap={interactive ? { scale: 0.95 } : {}}
        >
          <Star 
            className={`w-4 h-4 ${
              star <= (hoveredRating || rating) 
                ? 'fill-accent text-accent' 
                : 'text-muted-foreground'
            }`}
          />
        </motion.button>
      ))}
    </div>
  );
};

const Books = () => {
  const { t } = useLanguage();
  
  const [ratings, setRatings] = useState<Record<number, BookRating>>({
    1: { bookId: 1, rating: 4.5, totalRatings: 124, userRating: 0 },
    2: { bookId: 2, rating: 4.8, totalRatings: 89, userRating: 0 },
    3: { bookId: 3, rating: 4.3, totalRatings: 156, userRating: 0 },
  });

  const books = [
    {
      id: 1,
      title: "عندما يعود الحنين",
      year: "2018",
      type: "رواية",
      pages: 320,
      description: "رواية تحكي قصة شاب يعود إلى مدينته القديمة بعد غياب طويل، ليكتشف أن الذكريات قد تكون أحيانًا أثقل من أن نحملها، وأخف من أن نتركها.",
      cover: bookNostalgia,
      available: true,
      downloadUrl: "#",
      readUrl: "#"
    },
    {
      id: 2,
      title: "أطياف الذاكرة",
      year: "2020",
      type: "رواية", 
      pages: 280,
      description: "رحلة عبر ذاكرة بطل الرواية الذي يحاول إعادة تركيب ماضيه المتناثر بين مدن عدة وأشخاص تركوا بصماتهم في حياته.",
      cover: bookMemory,
      available: true,
      downloadUrl: "#",
      readUrl: "#"
    },
    {
      id: 3,
      title: "همسات في زمن الصمت",
      year: "2015",
      type: "مجموعة قصصية",
      pages: 180,
      description: "مجموعة من القصص القصيرة التي تلامس مشاعر الحب والفقدان والأمل في حياة شخصيات عادية تعيش في صمت.",
      cover: bookWhispers,
      available: true,
      downloadUrl: "#",
      readUrl: "#"
    },
  ];

  const handleRating = (bookId: number, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        userRating: rating,
        rating: ((prev[bookId].rating * prev[bookId].totalRatings) + rating) / (prev[bookId].totalRatings + 1),
        totalRatings: prev[bookId].totalRatings + 1
      }
    }));
  };

  return (
    <section id="books" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-primary inline-block px-8 bg-secondary relative z-10">
            {t('works')}
          </h2>
          <div className="absolute top-1/2 right-0 w-full h-0.5 bg-accent z-0"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 shadow-elegant">
                <div className="relative overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Book Status Badge */}
                  <Badge 
                    className="absolute top-4 right-4 bg-accent text-primary-dark font-semibold"
                  >
                    {book.available ? 'متاح' : 'قريباً'}
                  </Badge>
                </div>
                
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {book.title}
                    </h3>
                    <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                      <span>{book.year}</span>
                      <span>{book.type}</span>
                      <span>{book.pages} صفحة</span>
                    </div>
                  </div>

                  {/* Rating Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StarRating 
                        rating={ratings[book.id]?.rating || 0}
                        interactive={false}
                      />
                      <span className="text-sm text-muted-foreground">
                        ({ratings[book.id]?.totalRatings || 0})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
                      <span className="text-sm text-muted-foreground">
                        {Math.floor(Math.random() * 50) + 10}
                      </span>
                    </div>
                  </div>

                  {/* User Rating */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-primary">{t('rateBook')}:</p>
                    <StarRating 
                      rating={ratings[book.id]?.userRating || 0}
                      onRate={(rating) => handleRating(book.id, rating)}
                      interactive={true}
                    />
                  </div>

                  <p className="text-foreground text-sm line-clamp-3 leading-relaxed">
                    {book.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary-light text-primary-foreground transition-smooth"
                      asChild
                    >
                      <a href={book.readUrl} className="flex items-center justify-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        {t('readOnline')}
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-accent text-accent hover:bg-accent hover:text-primary-dark transition-smooth"
                      asChild
                    >
                      <a href={book.downloadUrl} className="flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        {t('downloadBook')}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Books;