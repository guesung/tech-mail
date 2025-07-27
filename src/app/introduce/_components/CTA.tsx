"use client";

import { motion } from "framer-motion";

export default function CTA() {
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
          <div className="text-center">
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              지금 바로 시작하세요
            </h3>
            <p className="text-gray-600 mb-8">
              관심 있는 기술 블로그를 구독하고 매일 오전 8시에 정리된 새 글을
              받아보세요
            </p>
            <motion.button
              onClick={() => (window.location.href = "/")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              구독 시작하기
            </motion.button>
          </div>
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
