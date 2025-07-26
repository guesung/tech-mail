"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IntroducePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Tech Mail</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            좋아하는 기술 블로그들을 한 곳에서 구독하고, 새로운 글이 올라올
            때마다 이메일로 알림을 받아보세요.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="px-8 py-3">
                지금 구독하기
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-3">
              더 알아보기
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <CardTitle>스마트 알림</CardTitle>
              <CardDescription>
                새로운 글이 올라오면 즉시 이메일로 알림을 받아보세요
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <CardTitle>선별된 블로그</CardTitle>
              <CardDescription>
                카카오, 네이버, 토스 등 유명 기업과 개발자들의 블로그를 제공
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
              </div>
              <CardTitle>맞춤 설정</CardTitle>
              <CardDescription>
                개인 또는 기업 블로그별로 원하는 콘텐츠만 선택해서 구독
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How it works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            어떻게 작동하나요?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">블로그 선택</h3>
              <p className="text-gray-600">
                관심 있는 기술 블로그들을 선택하세요
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">이메일 등록</h3>
              <p className="text-gray-600">
                알림을 받을 이메일 주소를 입력하세요
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">알림 받기</h3>
              <p className="text-gray-600">
                새 글이 올라오면 이메일로 알림을 받아보세요
              </p>
            </div>
          </div>
        </div>

        {/* Popular Blogs */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            인기 기술 블로그
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: "카카오", logo: "/blogs/kakao.png" },
              { name: "네이버", logo: "/blogs/naver.png" },
              { name: "토스", logo: "/blogs/toss.ico" },
              { name: "우아한형제들", logo: "/blogs/woowahan.png" },
              { name: "당근마켓", logo: "/blogs/daangn.ico" },
              { name: "라인", logo: "/blogs/line.ico" },
            ].map((blog) => (
              <div
                key={blog.name}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={blog.logo}
                  alt={blog.name}
                  className="w-12 h-12 object-contain mb-2"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/blogs/default.png";
                  }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {blog.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">지금 시작해보세요!</h2>
          <p className="text-xl mb-8 opacity-90">
            최신 기술 트렌드를 놓치지 말고, 좋아하는 블로그들을 구독해보세요.
          </p>
          <Link href="/">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              무료로 구독하기
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            © 2024 기술 블로그 구독 서비스. RSS 피드를 통해 최신 기술 소식을
            전달합니다.
          </p>
        </div>
      </div>
    </main>
  );
}
