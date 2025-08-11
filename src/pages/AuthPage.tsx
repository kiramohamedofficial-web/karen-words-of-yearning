import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn, UserPlus, Eye, EyeOff, ArrowRight, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message === "Invalid login credentials" ? "بيانات الدخول غير صحيحة" : error.message);
    } else {
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بعودتك!",
      });
      navigate("/");
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const { error } = await signUp(email, password, displayName);
    
    if (error) {
      if (error.message.includes("already registered")) {
        setError("هذا البريد الإلكتروني مسجل بالفعل");
      } else {
        setError(error.message);
      }
    } else {
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-light to-primary-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            className="inline-block"
          >
            <BookOpen className="w-16 h-16 text-accent mx-auto mb-4" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">كريم محمد سالم</h1>
          <p className="text-accent">منصة الكتب والروايات</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-center text-white">
              مرحباً بك
            </CardTitle>
            <CardDescription className="text-center text-white/80">
              سجل دخولك أو أنشئ حساباً جديداً للاستمتاع بقراءة الكتب
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/10">
                <TabsTrigger value="signin" className="text-white data-[state=active]:bg-accent data-[state=active]:text-primary-dark">
                  <LogIn className="w-4 h-4 ml-2" />
                  تسجيل الدخول
                </TabsTrigger>
                <TabsTrigger value="signup" className="text-white data-[state=active]:bg-accent data-[state=active]:text-primary-dark">
                  <UserPlus className="w-4 h-4 ml-2" />
                  إنشاء حساب
                </TabsTrigger>
              </TabsList>
              
              {error && (
                <Alert className="mt-4 bg-destructive/10 border-destructive/20">
                  <AlertDescription className="text-destructive">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      placeholder="mohammed.k221m@gmail.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">كلمة المرور</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10"
                        placeholder="••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-light text-primary-dark font-semibold"
                    disabled={loading}
                  >
                    {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName" className="text-white">الاسم الكامل</Label>
                    <Input
                      id="displayName"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      placeholder="اسمك الكامل"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-white">البريد الإلكتروني</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      placeholder="البريد الإلكتروني"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-white">كلمة المرور</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10"
                        placeholder="كلمة مرور قوية"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent-light text-primary-dark font-semibold"
                    disabled={loading}
                  >
                    {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب جديد"}
                    <UserPlus className="w-4 h-4 mr-2" />
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <Separator className="my-6 bg-white/20" />
            
            <div className="text-center">
              <Button
                variant="link"
                className="text-accent hover:text-accent-light"
                onClick={() => navigate("/")}
              >
                العودة إلى الصفحة الرئيسية
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;