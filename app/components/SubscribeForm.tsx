"use client";
import { useState } from "react";
import { Blog } from "@/types/blog";

interface Props {
  blogs: Blog[];
}

export default function SubscribeForm({ blogs }: Props) {
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(false);
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, blogIds: selected }),
    });
    if (res.ok) {
      setResult("구독이 완료되었습니다!");
      setError(false);
    } else {
      setResult("구독에 실패했습니다.");
      setError(true);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-50 rounded shadow p-6 border border-gray-200 text-gray-900"
    >
      <label className="block">
        <span className="block mb-1 font-medium">이메일</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-3 py-2 rounded outline-none transition text-gray-900 bg-white"
          placeholder="your@email.com"
        />
      </label>
      <label className="block">
        <span className="block mb-1 font-medium">구독할 블로그</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {blogs.map((blog) => (
            <label key={blog.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={blog.id}
                checked={selected.includes(blog.id)}
                onChange={(e) => {
                  setSelected((sel) =>
                    e.target.checked
                      ? [...sel, blog.id]
                      : sel.filter((id) => id !== blog.id)
                  );
                }}
                className="accent-blue-600"
              />
              <span className="text-gray-900">{blog.name}</span>
            </label>
          ))}
        </div>
      </label>
      <button
        type="submit"
        disabled={loading || !email || selected.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2 rounded font-semibold disabled:opacity-50 transition"
      >
        {loading ? "구독 중..." : "구독하기"}
      </button>
      {result && (
        <div
          className={`mt-2 text-center font-semibold ${error ? "text-red-600" : "text-green-700"}`}
        >
          {result}
        </div>
      )}
    </form>
  );
}
