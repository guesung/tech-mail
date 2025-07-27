"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // 실제 구독 로직은 여기에 구현
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* 배경 애니메이션 요소들 */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-24 h-24 bg-white opacity-10 rounded-full"
          animate={{
            scale: [1, 0.8, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-white opacity-10 rounded-full"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            관심 있는 기술 블로그를 선택하고 이메일을 입력하면 매일 오전 8시에
            정리된 새 글을 받을 수 있어요
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold text-gray-900 mb-4"
                >
                  이메일 주소를 입력하세요
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-6 py-4 text-lg border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    📧
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !email}
                className={`w-full py-4 px-8 rounded-2xl text-lg font-semibold transition-all duration-200 ${
                  isSubmitting || !email
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transform hover:scale-105"
                }`}
                whileHover={!isSubmitting && email ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting && email ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    구독 중...
                  </div>
                ) : (
                  "무료로 구독 시작하기"
                )}
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                구독이 완료되었습니다!
              </h3>
              <p className="text-gray-600 mb-6">
                이제 관심 있는 기술 블로그의 새 글을 이메일로 받아보실 수 있어요
              </p>
              <motion.button
                onClick={() => setIsSubmitted(false)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                다른 이메일로 구독하기
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* 추가 정보 */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl mb-2">⚡</div>
            <h4 className="text-lg font-semibold mb-2">빠른 설정</h4>
            <p className="text-blue-100 text-sm">1분 만에 구독 설정 완료</p>
          </motion.div>
          <motion.div
            className="text-center text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl mb-2">🆓</div>
            <h4 className="text-lg font-semibold mb-2">완전 무료</h4>
            <p className="text-blue-100 text-sm">별도 비용 없이 이용 가능</p>
          </motion.div>
          <motion.div
            className="text-center text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="text-lg font-semibold mb-2">안전한 구독</h4>
            <p className="text-blue-100 text-sm">언제든지 구독 해지 가능</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
