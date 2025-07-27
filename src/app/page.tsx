import Header from "./_components/Header";
import SubscribeForm from "./_components/SubscribeForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6">
        <Header />
        <SubscribeForm />
      </div>
    </main>
  );
}
