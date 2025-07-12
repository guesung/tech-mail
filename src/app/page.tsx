import BLOGS from "@/data/blogs.json";
import SubscribeForm from "@/components/SubscribeForm";
import UnsubscribeForm from "@/components/UnsubscribeForm";

export default function Home() {
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">기술 블로그 구독</h1>
      <p className="mb-6 text-gray-600">
        관심있는 블로그를 선택하고 이메일을 입력하면 새 글이 올라올 때 알림을
        받을 수 있습니다.
      </p>
      <SubscribeForm blogs={BLOGS} />
      {/* <h2 className="text-lg font-semibold mt-12 mb-2">구독 해지</h2> */}
      {/* <UnsubscribeForm /> */}
    </main>
  );
}
