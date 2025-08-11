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
    contact: 'اتصل بي',
    
    // Hero
    authorName: 'كريم محمد سالم ابحن',
    heroDescription: 'كاتب وروائي شاب، يسرد لحظات الألم والحنين بلغةٍ بسيطةٍ مشبعةٍ بالعاطفة.',
    exploreBooks: 'استكشف المؤلفات',
    contactMe: 'تواصل معي',
    
    // About
    aboutAuthor: 'عن الكاتب',
    biography: 'سيرة ذاتية',
    
    // Books
    works: 'المؤلفات',
    buyNow: 'اشتري الآن',
    
    // Blog
    latestArticles: 'أحدث المقالات',
    readMore: 'اقرأ المزيد',
    
    // Contact
    contactUs: 'تواصل معي',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    subject: 'الموضوع',
    message: 'الرسالة',
    sendMessage: 'إرسال الرسالة',
    
    // Footer
    aboutBlog: 'عن المدونة',
    quickLinks: 'روابط سريعة',
    newsletter: 'النشرة البريدية',
    allRightsReserved: 'جميع الحقوق محفوظة',
    
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
    contact: 'Contact',
    
    // Hero
    authorName: 'Karim Mohammed Salem Abhen',
    heroDescription: 'A young novelist and writer who narrates moments of pain and nostalgia in simple language infused with emotion.',
    exploreBooks: 'Explore Books',
    contactMe: 'Contact Me',
    
    // About
    aboutAuthor: 'About the Author',
    biography: 'Biography',
    
    // Books
    works: 'Works',
    buyNow: 'Buy Now',
    
    // Blog
    latestArticles: 'Latest Articles',
    readMore: 'Read More',
    
    // Contact
    contactUs: 'Contact Us',
    fullName: 'Full Name',
    email: 'Email',
    subject: 'Subject',
    message: 'Message',
    sendMessage: 'Send Message',
    
    // Footer
    aboutBlog: 'About Blog',
    quickLinks: 'Quick Links',
    newsletter: 'Newsletter',
    allRightsReserved: 'All Rights Reserved',
    
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