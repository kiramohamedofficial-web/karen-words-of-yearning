import Header from "@/components/Header";
import QuotesBar from "@/components/QuotesBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Books from "@/components/Books";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
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
        <Books />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
