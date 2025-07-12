"use client";
import { useState } from "react";
import type { BlogInfo } from "./blogs";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

interface Props {
  blogs: BlogInfo[];
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
      body: JSON.stringify({ email, rssUrls: selected }),
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
    <Card className="p-6 mb-4">
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
        <label className="block">
          <span className="block mb-1 font-medium">구독할 블로그</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {blogs.map((blog) => (
              <label key={blog.rssUrl} className="flex items-center gap-2">
                <Checkbox
                  checked={selected.includes(blog.rssUrl)}
                  onCheckedChange={(checked) => {
                    setSelected((sel) =>
                      checked
                        ? [...sel, blog.rssUrl]
                        : sel.filter((id) => id !== blog.rssUrl)
                    );
                  }}
                  id={blog.rssUrl}
                />
                <span className="text-gray-900">{blog.name}</span>
              </label>
            ))}
          </div>
        </label>
        <Button
          type="submit"
          disabled={loading || !email || selected.length === 0}
          className="w-full"
        >
          {loading ? "구독 중..." : "구독하기"}
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
