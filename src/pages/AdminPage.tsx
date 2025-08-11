import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Users, 
  BookOpen, 
  Star, 
  Upload,
  Settings,
  Eye
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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

const AdminPage = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddBook, setShowAddBook] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "كريم محمد سالم",
    description: "",
    content: "",
    cover_url: "",
    category: "رواية",
    price: 0,
    is_free: true,
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    if (profile && !profile.is_admin) {
      toast({
        title: "غير مصرح",
        description: "ليس لديك صلاحية للوصول لهذه الصفحة",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    fetchBooks();
  }, [user, profile]);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل الكتب",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookData = {
        ...formData,
        published_date: new Date().toISOString().split('T')[0],
      };

      let error;
      if (editingBook) {
        ({ error } = await supabase
          .from('books')
          .update(bookData)
          .eq('id', editingBook.id));
      } else {
        ({ error } = await supabase
          .from('books')
          .insert([bookData]));
      }

      if (error) throw error;

      toast({
        title: "تم بنجاح",
        description: editingBook ? "تم تحديث الكتاب" : "تم إضافة الكتاب",
      });

      setFormData({
        title: "",
        author: "كريم محمد سالم",
        description: "",
        content: "",
        cover_url: "",
        category: "رواية",
        price: 0,
        is_free: true,
      });
      setShowAddBook(false);
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      console.error('Error saving book:', error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ الكتاب",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      content: book.content,
      cover_url: book.cover_url,
      category: book.category,
      price: book.price,
      is_free: book.is_free,
    });
    setShowAddBook(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الكتاب؟')) return;

    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "تم الحذف",
        description: "تم حذف الكتاب بنجاح",
      });
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      toast({
        title: "خطأ",
        description: "فشل في حذف الكتاب",
        variant: "destructive",
      });
    }
  };

  if (!user || !profile?.is_admin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">الوصول مقيد</h2>
          <p className="text-muted-foreground mb-4">هذه الصفحة مخصصة للمديرين فقط</p>
          <Button onClick={() => navigate('/')} variant="outline">
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">لوحة التحكم</h1>
              <p className="text-white/80">إدارة الكتب والمحتوى</p>
            </div>
            <Button
              onClick={() => {
                setShowAddBook(!showAddBook);
                setEditingBook(null);
                setFormData({
                  title: "",
                  author: "كريم محمد سالم",
                  description: "",
                  content: "",
                  cover_url: "",
                  category: "رواية",
                  price: 0,
                  is_free: true,
                });
              }}
              className="bg-accent hover:bg-accent-light text-primary-dark"
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة كتاب جديد
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">إجمالي الكتب</p>
                  <p className="text-2xl font-bold">{books.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">الكتب المجانية</p>
                  <p className="text-2xl font-bold">{books.filter(b => b.is_free).length}</p>
                </div>
                <Star className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">إجمالي التقييمات</p>
                  <p className="text-2xl font-bold">
                    {books.reduce((sum, book) => sum + book.total_ratings, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">متوسط التقييم</p>
                  <p className="text-2xl font-bold">
                    {books.length > 0 
                      ? (books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1)
                      : '0.0'
                    }
                  </p>
                </div>
                <Star className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Book Form */}
        {showAddBook && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingBook ? "تعديل الكتاب" : "إضافة كتاب جديد"}
                </CardTitle>
                <CardDescription>
                  املأ البيانات التالية لإضافة أو تعديل الكتاب
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">عنوان الكتاب</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="author">المؤلف</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">الفئة</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        placeholder="رواية، قصة قصيرة، شعر..."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cover_url">رابط الغلاف</Label>
                      <Input
                        id="cover_url"
                        value={formData.cover_url}
                        onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">الوصف</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">محتوى الكتاب</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={8}
                      placeholder="محتوى الكتاب الكامل..."
                    />
                  </div>

                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Switch
                      id="is_free"
                      checked={formData.is_free}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_free: checked })}
                    />
                    <Label htmlFor="is_free">كتاب مجاني</Label>
                  </div>

                  {!formData.is_free && (
                    <div className="space-y-2">
                      <Label htmlFor="price">السعر (بالدولار)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                      />
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button type="submit" disabled={loading}>
                      {loading ? "جاري الحفظ..." : editingBook ? "تحديث الكتاب" : "إضافة الكتاب"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddBook(false);
                        setEditingBook(null);
                      }}
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Books List */}
        <Card>
          <CardHeader>
            <CardTitle>قائمة الكتب</CardTitle>
            <CardDescription>
              جميع الكتب المتاحة في المكتبة
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">جاري تحميل الكتب...</p>
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">لا توجد كتب بعد</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-lg p-4 hover:shadow-hover transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={book.cover_url || "/placeholder.svg"}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{book.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={book.is_free ? "secondary" : "outline"} className="text-xs">
                            {book.is_free ? "مجاني" : `$${book.price}`}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-accent fill-current" />
                            <span className="text-xs">{book.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => navigate(`/book/${book.id}`)}
                            className="h-7 px-2 text-xs"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(book)}
                            className="h-7 px-2 text-xs"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(book.id)}
                            className="h-7 px-2 text-xs"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;