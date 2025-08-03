"use client";
import blogs from "@/data/blogs.json";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { supabase } from "../../../lib/supabase";
import { BlogSection } from "./BlogSection";

interface FormValues {
  email: string;
  selectedBlogNames: string[];
}

export default function SubscribeForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      selectedBlogNames: [],
    },
  });
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setErrorState] = React.useState(false);

  const onSubmit = async (data: FormValues) => {
    setResult(null);
    setErrorState(false);
    const { error } = await supabase.from("subscribers").upsert(
      {
        email: data.email,
        subscribedBlogIds: data.selectedBlogNames,
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
        className="space-y-6 text-gray-900"
      >
        <div className="space-y-4">
          <Controller
            control={control}
            name="selectedBlogNames"
            render={({ field }) => {
              const personalBlogs = blogs
                .filter((blog) => blog.show && !blog.company)
                .sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
              const companyBlogs = blogs
                .filter((blog) => blog.show && blog.company)
                .sort((a, b) => (a.order ?? 100) - (b.order ?? 100));

              return (
                <>
                  <BlogSection
                    title="개인 블로그"
                    icon="👤"
                    blogs={personalBlogs}
                    selectedBlogNames={field.value}
                    onSelectionChange={field.onChange}
                  />
                  <BlogSection
                    title="기업 블로그"
                    icon="🏢"
                    blogs={companyBlogs}
                    selectedBlogNames={field.value}
                    onSelectionChange={field.onChange}
                  />
                </>
              );
            }}
          />
        </div>
        <div className="block">
          <span className="block mb-1 font-medium">이메일</span>
          <Input
            type="email"
            required
            placeholder="your@email.com"
            className="mb-2"
            {...register("email", { required: true })}
          />
        </div>
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
