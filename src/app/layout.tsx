import { StagewiseToolbar } from "@stagewise/toolbar-next";
import ReactPlugin from "@stagewise-plugins/react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tech Mail - 블로그 알림 서비스",
  description:
    "관심있는 블로그를 선택하고 이메일을 입력하면 새 글이 올라올 때 알림을 받을 수 있습니다.",
  keywords: ["블로그", "알림", "이메일", "구독", "RSS", "기술블로그"],
  authors: [{ name: "guesung" }],
  creator: "guesung",
  publisher: "guesung",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.tech-mail.shop/"),
  openGraph: {
    title: "Tech Mail - 블로그 알림 서비스",
    description:
      "관심있는 블로그를 선택하고 이메일을 입력하면 새 글이 올라올 때 알림을 받을 수 있습니다.",
    url: "https://www.tech-mail.shop/",
    siteName: "Tech Mail",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Mail - 블로그 알림 서비스",
    description:
      "관심있는 블로그를 선택하고 이메일을 입력하면 새 글이 올라올 때 알림을 받을 수 있습니다.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "6UDfTp2i8BdsHYa5wJRCsYpY3MCaPm1_1reFSJvZ1l8",
    other: {
      "naver-site-verification": "c1253582bd6233330be2f8e8d65f6276767db8b7",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        <StagewiseToolbar
          config={{
            plugins: [ReactPlugin],
          }}
        />
        {children}
      </body>
    </html>
  );
}
