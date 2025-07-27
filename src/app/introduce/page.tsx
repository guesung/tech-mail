import Navigation from "./_components/Navigation";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import BlogGrid from "./_components/BlogGrid";
import FAQ from "./_components/FAQ";
import CTA from "./_components/CTA";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <BlogGrid />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
