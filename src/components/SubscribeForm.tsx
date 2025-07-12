"use client";
import { checkRss } from "@/app/api/cron/check-rss/route";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

interface BlogInfo {
  name: string;
  rssUrl: string;
  websiteUrl: string;
  ogImage: string;
}

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

  useEffect(() => {
    (async () => {
      checkRss();
    })();
  }, []);

  const onSubmit = async (data: FormValues) => {
    setResult(null);
    setErrorState(false);
    const { error } = await supabase.from("subscribers").upsert(
      {
        email: data.email,
        subscribed_blog_ids: data.rssUrls,
        is_active: true,
      },
      { onConflict: "email" }
    );
    if (!error) {
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
