import Link from "next/link";
import Header from "./_components/Header";
import SubscribeForm from "./_components/SubscribeForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Header />
        <SubscribeForm />
        <div className="mt-6 text-center">
          <Link
            href="https://guesung.notion.site/24489de02fde80f58512d978a2360d0d?pvs=105"
            target="_blank"
            className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
          >
            문의하기
          </Link>{" "}
          /{" "}
          <Link
            href="https://guesung.notion.site/24489de02fde8057aa1dc425a87e961d?pvs=105"
            target="_blank"
            className="text-sm text-gray-600 hover:text-gray-900 hover:underline"
          >
            블로그 추가하기
          </Link>
        </div>
      </div>
    </main>
  );
}
