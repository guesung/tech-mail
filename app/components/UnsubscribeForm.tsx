"use client";
import { useState } from "react";

export default function UnsubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    const res = await fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) setResult("구독이 해지되었습니다.");
    else setResult("구독 해지에 실패했습니다.");
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white rounded shadow p-6 mt-8"
    >
      <label className="block">
        <span className="block mb-1 font-medium">이메일</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="your@email.com"
        />
      </label>
      <button
        type="submit"
        disabled={loading || !email}
        className="w-full bg-red-600 text-white py-2 rounded font-semibold disabled:opacity-50"
      >
        {loading ? "처리 중..." : "구독 해지하기"}
      </button>
      {result && (
        <div className="mt-2 text-center text-green-600">{result}</div>
      )}
    </form>
  );
}
