"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import blogs from "@/data/blogs.json";
import Image from "next/image";
import Link from "next/link";

interface FormValues {
  email: string;
  blogIds: string[];
}

interface BlogCheckboxItemProps {
  blog: (typeof blogs)[number];
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function BlogCheckboxItem({
  blog,
  checked,
  onCheckedChange,
}: BlogCheckboxItemProps) {
  return (
    <label className="flex items-center gap-2">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        id={blog.name}
      />
      <Image
        src={`/blogs/${blog.logo}`}
        alt={blog.name}
        width={24}
        height={24}
        className="rounded object-contain"
        style={{ minWidth: 24, minHeight: 24 }}
      />
      <Link href={blog.url} target="_blank">
        <span className="text-gray-900">{blog.name}</span>
      </Link>
    </label>
  );
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
      blogIds: [],
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
        subscribedBlogIds: data.blogIds,
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
          {/* 개인 블로그 섹션 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              👤 개인 블로그
            </h3>
            <Controller
              control={control}
              name="blogIds"
              render={({ field }) => {
                const personalBlogs = blogs.filter(
                  (blog) => blog.show && !blog.company
                );
                const allPersonalSelected = personalBlogs.every((blog) =>
                  field.value.includes(blog.name)
                );

                return (
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (allPersonalSelected) {
                          // Unselect all personal blogs
                          field.onChange(
                            field.value.filter(
                              (id) =>
                                !personalBlogs.some((blog) => blog.name === id)
                            )
                          );
                        } else {
                          // Select all personal blogs
                          const personalBlogNames = personalBlogs.map(
                            (blog) => blog.name
                          );
                          field.onChange([
                            ...field.value,
                            ...personalBlogNames,
                          ]);
                        }
                      }}
                      className="text-sm"
                    >
                      {allPersonalSelected ? "전체 해제" : "전체 선택"}
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      {personalBlogs.map((blog) => (
                        <BlogCheckboxItem
                          key={blog.name}
                          blog={blog}
                          checked={field.value.includes(blog.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, blog.name]);
                            } else {
                              field.onChange(
                                field.value.filter((id) => id !== blog.name)
                              );
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              }}
            />
          </div>

          {/* 기업 블로그 섹션 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              🏢 기업 블로그
            </h3>
            <Controller
              control={control}
              name="blogIds"
              render={({ field }) => {
                const companyBlogs = blogs.filter(
                  (blog) => blog.show && blog.company
                );
                const allCompanySelected = companyBlogs.every((blog) =>
                  field.value.includes(blog.name)
                );

                return (
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (allCompanySelected) {
                          // Unselect all company blogs
                          field.onChange(
                            field.value.filter(
                              (id) =>
                                !companyBlogs.some((blog) => blog.name === id)
                            )
                          );
                        } else {
                          // Select all company blogs
                          const companyBlogNames = companyBlogs.map(
                            (blog) => blog.name
                          );
                          field.onChange([...field.value, ...companyBlogNames]);
                        }
                      }}
                      className="text-sm"
                    >
                      {allCompanySelected ? "전체 해제" : "전체 선택"}
                    </Button>
                    <div className="grid grid-cols-2 gap-2">
                      {companyBlogs.map((blog) => (
                        <BlogCheckboxItem
                          key={blog.name}
                          blog={blog}
                          checked={field.value.includes(blog.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, blog.name]);
                            } else {
                              field.onChange(
                                field.value.filter((id) => id !== blog.name)
                              );
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              }}
            />
          </div>
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
