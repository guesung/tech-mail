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

interface FormValues {
  email: string;
  blogIds: number[];
}

function getRecentPostCount(blogId: number) {
  // Figma에 맞춰 임시로 고정값/랜덤값 사용
  const counts = [12, 8, 15, 6, 9, 7, 11, 5, 4];
  return counts[blogId % counts.length];
}

function getBlogDescription(blogId: number) {
  // Figma에 맞춰 임시 샘플 텍스트
  const descs = [
    "최신 개발 트렌드와 실무 경험을 공유합니다.",
    "다양한 개발 경험과 인사이트를 제공합니다.",
    "AI, 클라우드, 보안 기술에 대한 콘텐츠.",
    "혁신적인 금융 서비스 개발 이야기.",
    "대용량 트래픽 처리와 서비스 개발 노하우.",
    "물류와 이커머스 기술을 다룹니다.",
    "대규모 서비스 운영과 개발 경험.",
    "빠른 배송을 가능하게 하는 기술력.",
    "핀테크 기술과 데이터 분석 노하우.",
  ];
  return descs[blogId % descs.length];
}

export default function SubscribeForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      blogIds: [],
    },
  });
  const [result, setResult] = React.useState<string | null>(null);
  const [error, setErrorState] = React.useState(false);
  const blogIds = watch("blogIds");

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

  // 전체 선택/해제
  const handleSelectAll = () =>
    setValue(
      "blogIds",
      blogs.map((b) => b.id)
    );
  const handleDeselectAll = () => setValue("blogIds", []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 헤더 */}

      {/* 블로그 선택 카드 영역 */}
      <Card className="relative p-8 mb-8 bg-white shadow-md">
        <div className="flex items-center mb-6">
          <span className="text-[21px] text-[#101828] font-medium mr-4">
            구독할 기술 블로그 선택
          </span>
          <span className="text-[12px] text-[#6a7282]">
            ({blogIds.length}개 선택됨)
          </span>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              className="text-[#155dfc] text-[12px]"
              onClick={handleSelectAll}
            >
              전체 선택
            </button>
            <button
              type="button"
              className="text-[#4a5565] text-[12px]"
              onClick={handleDeselectAll}
            >
              선택 해제
            </button>
          </div>
        </div>
        <Controller
          control={control}
          name="blogIds"
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {blogs.map((blog) => {
                const checked = field.value.includes(blog.id);
                return (
                  <div
                    key={blog.id}
                    className={`relative flex flex-col bg-white rounded-[12.75px] border border-[rgba(0,0,0,0.1)] p-6 shadow-sm transition ring-2 ring-transparent ${checked ? "ring-[#155dfc]" : ""}`}
                  >
                    <div className="flex items-center mb-3">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(checked) => {
                          if (checked)
                            field.onChange([...field.value, blog.id]);
                          else
                            field.onChange(
                              field.value.filter((id) => id !== blog.id)
                            );
                        }}
                        id={blog.id.toString()}
                        className="mr-3 size-5 rounded bg-[#f3f3f5] border border-[rgba(0,0,0,0.1)] shadow"
                      />
                      <div className="bg-gray-100 rounded-[8.75px] size-[35px] flex items-center justify-center mr-3">
                        <Image
                          src={`/blogs/${blog.logo}`}
                          alt={blog.name}
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-[15.8px] text-[#101828] font-medium leading-6">
                          {blog.name}
                        </div>
                        <div className="bg-[#eceef2] rounded-[6.75px] px-2 py-0.5 text-[10.5px] text-[#030213] inline-block mt-1">
                          최근 {getRecentPostCount(blog.id)}개 글
                        </div>
                      </div>
                    </div>
                    <div className="text-[12.3px] text-[#4a5565] leading-[1.6]">
                      {getBlogDescription(blog.id)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        />
      </Card>
      {/* 이메일 입력 카드 */}
      <Card className="relative p-8 mb-8 bg-white shadow-md max-w-md mx-auto">
        <div className="text-[17.5px] text-[#101828] font-medium text-center mb-2">
          구독 설정
        </div>
        <div className="text-[12.3px] text-[#4a5565] text-center mb-4">
          구독할 블로그를 선택해주세요
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-[12.3px] text-[#364153] mb-1">
              알림받을 이메일 주소
            </label>
            <Input
              type="email"
              required
              placeholder="example@email.com"
              className="bg-[#f3f3f5] rounded-[6.75px] h-[31.5px] px-3 text-[13px] placeholder:text-[#717182] border-none focus-visible:ring-2 focus-visible:ring-[#155dfc]"
              {...register("email", { required: true })}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || blogIds.length === 0}
            className="w-full h-[31.5px] rounded-[6.75px] text-[12.3px] font-medium bg-[#155dfc] text-white disabled:bg-[#d1d5dc] disabled:opacity-50"
          >
            {blogIds.length === 0
              ? "블로그를 선택해주세요"
              : isSubmitting
                ? "구독 중..."
                : "구독하기"}
          </Button>
          {result && (
            <div
              className={`mt-2 text-center font-semibold ${error ? "text-red-600" : "text-green-700"}`}
            >
              {result}
            </div>
          )}
        </form>
        <div className="text-center text-[#6a7282] text-[10.5px] mt-4">
          언제든지 구독을 취소할 수 있습니다
        </div>
      </Card>
    </div>
  );
}
