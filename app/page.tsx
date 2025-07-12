import { supabase } from "@/app/lib/supabase";
import { Blog } from "@/app/types/blog";
import SubscribeForm from "./components/SubscribeForm";

export default async function Home() {
  // SSR: 블로그 목록 조회
  const { data: blogs } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });
  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">기술 블로그 구독</h1>
      <p className="mb-6 text-gray-600">
        관심있는 블로그를 선택하고 이메일을 입력하면 새 글이 올라올 때 알림을
        받을 수 있습니다.
      </p>
      <SubscribeForm blogs={blogs ?? []} />
    </main>
  );
}
