import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Star, 
  Download, 
  BookOpen, 
  Heart, 
  Share2, 
  User, 
  Calendar,
  Clock,
  Eye
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string;
  cover_url: string;
  published_date: string;
  rating: number;
  total_ratings: number;
  total_reviews: number;
  price: number;
  is_free: boolean;
  category: string;
}

const BookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isReading, setIsReading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setBook(data);
    } catch (error) {
      console.error('Error fetching book:', error);
      toast({
        title: "خطأ",
        description: "لم يتم العثور على الكتاب",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    toast({
      title: "جاري التحميل",
      description: "سيتم تحميل الكتاب قريباً",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: book?.title,
          text: book?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "تم نسخ الرابط",
        description: "تم نسخ رابط الكتاب إلى الحافظة",
      });
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "تم إلغاء الإعجاب" : "تم الإعجاب",
      description: liked ? "تم إزالة الكتاب من المفضلة" : "تم إضافة الكتاب إلى المفضلة",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? "text-accent fill-current" 
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const progress = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
    setReadingProgress(Math.min(progress, 100));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل الكتاب...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">لم يتم العثور على الكتاب</h2>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
  }

  if (isReading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Reading Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsReading(false)}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="font-semibold text-foreground">{book.title}</h1>
                  <p className="text-sm text-muted-foreground">بقلم {book.author}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {Math.round(readingProgress)}%
                </span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted h-1 rounded-full mt-3">
              <div 
                className="bg-accent h-1 rounded-full transition-all duration-300"
                style={{ width: `${readingProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Reading Content */}
        <div 
          className="container mx-auto px-4 py-8 max-w-4xl"
          onScroll={handleScroll}
          style={{ height: 'calc(100vh - 100px)', overflowY: 'auto' }}
        >
          <div className="prose prose-lg max-w-none text-foreground">
            <h1 className="text-3xl font-bold mb-4 text-center">{book.title}</h1>
            <p className="text-center text-muted-foreground mb-8">بقلم {book.author}</p>
            
            <div className="whitespace-pre-wrap leading-relaxed">
              {book.content || `
هذا نص تجريبي للكتاب "${book.title}" بقلم ${book.author}.

${book.description}

في هذا الكتاب الرائع، يأخذنا الكاتب في رحلة مشوقة عبر عوالم مختلفة من الخيال والواقع. تتميز القصة بشخصيات عميقة ومؤثرة تترك أثراً عميقاً في نفس القارئ.

الفصل الأول: البداية

كانت تلك ليلة مظلمة في شوارع المدينة القديمة. الأضواء الخافتة تتراقص على الجدران الحجرية، والرياح تحمل معها أصداء الماضي. في هذه الأجواء الغامضة، تبدأ حكايتنا...

[يتم عرض محتوى الكتاب هنا - هذا مجرد نص تجريبي]

الفصل الثاني: التطور

مع تقدم الأحداث، نكتشف أن هناك أسراراً عميقة تكمن خلف الواجهة البسيطة للحياة اليومية. شخصياتنا تواجه تحديات جديدة تختبر قوتهم وإرادتهم...

[محتوى إضافي للكتاب...]

الخاتمة

وهكذا تنتهي رحلتنا مع هذا الكتاب الرائع، تاركة في قلوبنا ذكريات جميلة ودروساً قيمة نحملها معنا في مسيرة الحياة.
              `}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 mb-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة إلى الصفحة الرئيسية
          </Button>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-accent text-accent-foreground">
                  {book.category || "رواية"}
                </Badge>
                {book.is_free && (
                  <Badge variant="outline" className="border-white text-white">
                    مجاني
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
              
              <div className="flex items-center gap-4 text-white/80 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{book.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(book.published_date).getFullYear()}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {renderStars(book.rating)}
                </div>
                <span className="text-accent font-semibold">{book.rating.toFixed(1)}</span>
                <span className="text-white/60">({book.total_ratings} تقييم)</span>
              </div>
              
              <p className="text-lg leading-relaxed text-white/90 mb-6">
                {book.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent-light text-primary-dark font-semibold"
                  onClick={() => setIsReading(true)}
                >
                  <BookOpen className="w-5 h-5 ml-2" />
                  قراءة الكتاب
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                  onClick={handleDownload}
                >
                  <Download className="w-5 h-5 ml-2" />
                  تحميل PDF
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                  onClick={handleLike}
                >
                  <Heart className={`w-5 h-5 ml-2 ${liked ? "fill-current text-red-400" : ""}`} />
                  {liked ? "مضاف للمفضلة" : "إضافة للمفضلة"}
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5 ml-2" />
                  مشاركة
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <img
                  src={book.cover_url || "/placeholder.svg"}
                  alt={book.title}
                  className="w-80 h-auto rounded-lg shadow-elegant"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Book Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="font-semibold text-2xl">{(book.total_ratings * 1.5).toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">قارئ</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="font-semibold text-2xl">{book.rating.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">التقييم</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <User className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="font-semibold text-2xl">{book.total_reviews}</p>
              <p className="text-sm text-muted-foreground">مراجعة</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Download className="w-8 h-8 text-accent mx-auto mb-2" />
              <p className="font-semibold text-2xl">{(book.total_ratings * 0.8).toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">تحميل</p>
            </CardContent>
          </Card>
        </div>

        {/* About the Book */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>عن الكتاب</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {book.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookPage;