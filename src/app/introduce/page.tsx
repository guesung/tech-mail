import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import BlogGrid from "@/components/BlogGrid";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      {/* <Stats /> */}
      <BlogGrid />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
