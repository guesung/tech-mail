"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const texts = [
    "하루에 15개 정도의 기술 블로그를 구독했어요",
    "새 글이 올라올 때마다 이메일로 알림을 받아요",
    "매일 오전 8시에 일괄 전송으로 깔끔하게 정리해요",
    "관심 있는 기술 트렌드를 놓치지 마세요",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* 배경 애니메이션 요소들 */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-12 h-12 bg-green-200 rounded-full opacity-20"
          animate={{
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* 메인 타이틀 */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-gray-900 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tech Mail
          </span>
        </motion.h1>

        {/* 서브타이틀 */}
        <motion.div
          className="h-20 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.p
            key={currentText}
            className="text-xl md:text-2xl text-gray-600 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {texts[currentText]}
          </motion.p>
        </motion.div>

        {/* CTA 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            지금 바로 시작하기
          </motion.button>
        </motion.div>

        {/* 통계 카드들 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
            <div className="text-gray-600">기술 블로그</div>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-purple-600 mb-2">
              실시간
            </div>
            <div className="text-gray-600">이메일 알림</div>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl font-bold text-green-600 mb-2">무료</div>
            <div className="text-gray-600">서비스 이용</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
