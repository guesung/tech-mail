import Header from "@/components/Header";
import SubscribeForm from "@/components/SubscribeForm";
import BLOGS from "@/data/blogs-with-images.json";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <Header />
      <SubscribeForm blogs={BLOGS} />
    </main>
  );
}
