"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";

interface BlogInfo {
  name: string;
  rssUrl: string;
  websiteUrl: string;
  ogImage: string;
}
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

interface Props {
  blogs: BlogInfo[];
}

interface FormValues {
  email: string;
  rssUrls: string[];
}

export default function SubscribeForm({ blogs }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    watch,
    setError,
    reset,
  } = useForm<FormValues>({
    defaultValues: { email: "", rssUrls: [] },
  });
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setErrorState] = React.useState(false);

  const onSubmit = async (data: FormValues) => {
    setResult(null);
    setErrorState(false);
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setResult("구독이 완료되었습니다!");
      setErrorState(false);
      reset();
    } else {
      setResult("구독에 실패했습니다.");
      setErrorState(true);
    }
  };

  return (
    <Card className="p-6 mb-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 text-gray-900"
      >
        <label className="block">
          <span className="block mb-1 font-medium">구독할 블로그</span>
          <Controller
            control={control}
            name="rssUrls"
            render={({ field }: { field: any }) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {blogs.map((blog) => (
                  <label key={blog.rssUrl} className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value.includes(blog.rssUrl)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...field.value, blog.rssUrl]);
                        } else {
                          field.onChange(
                            field.value.filter(
                              (id: string) => id !== blog.rssUrl
                            )
                          );
                        }
                      }}
                      id={blog.rssUrl}
                    />
                    <span className="text-gray-900">{blog.name}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </label>
        <label className="block">
          <span className="block mb-1 font-medium">이메일</span>
          <Input
            type="email"
            required
            placeholder="your@email.com"
            className="mb-2"
            {...register("email", { required: true })}
          />
        </label>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "구독 중..." : "구독하기"}
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
