import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Header
    home: 'الرئيسية',
    about: 'عن الكاتب',
    books: 'المؤلفات',
    blog: 'المدونة',
    
    // Hero
    authorName: 'كريم محمد سالم',
    authorSubtitle: 'كاتب وروائي',
    heroDescription: 'أسرد لحظات الألم والحنين بلغةٍ بسيطةٍ مشبعةٍ بالعاطفة.',
    exploreBooks: 'استكشف المؤلفات',
    readBooks: 'اقرأ الكتب',
    
    // About
    aboutAuthor: 'عن الكاتب',
    biography: 'سيرة ذاتية',
    
    // Books
    works: 'المؤلفات',
    buyNow: 'اشتري الآن',
    rateBook: 'قيّم الكتاب',
    readOnline: 'اقرأ أونلاين',
    downloadBook: 'تحميل الكتاب',
    rating: 'التقييم',
    reviews: 'المراجعات',
    
    // Blog
    latestArticles: 'أحدث المقالات',
    readMore: 'اقرأ المزيد',
    
    // Footer
    aboutBlog: 'عن المدونة',
    quickLinks: 'روابط سريعة',
    newsletter: 'النشرة البريدية',
    allRightsReserved: 'جميع الحقوق محفوظة',
    followMe: 'تابعني',
    
    // Auth
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
  },
  en: {
    // Header
    home: 'Home',
    about: 'About Author',
    books: 'Books',
    blog: 'Blog',
    
    // Hero
    authorName: 'Karim Mohammed Salem',
    authorSubtitle: 'Novelist & Writer',
    heroDescription: 'I narrate moments of pain and nostalgia in simple language infused with emotion.',
    exploreBooks: 'Explore Books',
    readBooks: 'Read Books',
    
    // About
    aboutAuthor: 'About the Author',
    biography: 'Biography',
    
    // Books
    works: 'Works',
    buyNow: 'Buy Now',
    rateBook: 'Rate Book',
    readOnline: 'Read Online',
    downloadBook: 'Download Book',
    rating: 'Rating',
    reviews: 'Reviews',
    
    // Blog
    latestArticles: 'Latest Articles',
    readMore: 'Read More',
    
    // Footer
    aboutBlog: 'About Blog',
    quickLinks: 'Quick Links',
    newsletter: 'Newsletter',
    allRightsReserved: 'All Rights Reserved',
    followMe: 'Follow Me',
    
    // Auth
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}