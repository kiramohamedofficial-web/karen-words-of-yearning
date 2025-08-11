import Header from "@/components/Header";
import QuotesBar from "@/components/QuotesBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import BooksWithRating from "@/components/BooksWithRating";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <QuotesBar />
      <main>
        <Hero />
        <About />
        <BooksWithRating />
        <Blog />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
