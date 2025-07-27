import Header from "./_components/Header";
import SubscribeForm from "./_components/SubscribeForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-12 px-6">
        <Header />
        <SubscribeForm />
      </div>
    </main>
  );
}
