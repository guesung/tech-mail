"use client";
import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function UnsubscribeForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(false);
    const res = await fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setResult("구독이 해지되었습니다.");
      setError(false);
    } else {
      setResult("구독 해지에 실패했습니다.");
      setError(true);
    }
    setLoading(false);
  };

  return (
    <Card className="p-6 mt-8">
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-900">
        <label className="block">
          <span className="block mb-1 font-medium">이메일</span>
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="mb-2"
          />
        </label>
        <Button type="submit" disabled={loading || !email} className="w-full">
          {loading ? "처리 중..." : "구독 해지하기"}
        </Button>
        {result && (
          <div
            className={`mt-2 text-center font-semibold ${error ? "text-red-600" : "text-green-700"}`}
          >
            {result}
          </div>
        )}
      </form>
    </Card>
  );
}
