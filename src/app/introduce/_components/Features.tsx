"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🕐",
    title: "일괄 전송",
    description: "매일 오전 7시에 모은 새 글들을 깔끔하게 정리해서 전송해요",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: "🎯",
    title: "맞춤형 구독",
    description: "관심 있는 기술 블로그만 선택해서 구독할 수 있어요",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: "⚡",
    title: "빠른 설정",
    description: "이메일만 입력하면 바로 구독이 시작돼요",
    color: "from-green-500 to-green-600",
  },
  {
    icon: "🔄",
    title: "자동 업데이트",
    description: "RSS 피드를 자동으로 확인해서 최신 글을 놓치지 않아요",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: "📱",
    title: "모바일 친화적",
    description: "어디서든 이메일로 편리하게 확인할 수 있어요",
    color: "from-red-500 to-red-600",
  },
  {
    icon: "🆓",
    title: "완전 무료",
    description: "별도 비용 없이 모든 기능을 무료로 이용할 수 있어요",
    color: "from-indigo-500 to-indigo-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tech Mail과 함께라면
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            관심 있는 기술 블로그의 새 글을 놓치지 않고, 언제 어디서든 편리하게
            확인할 수 있어요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 h-full"
                whileHover={{
                  scale: 1.05,
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-6"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {feature.icon}
                </motion.div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* 추가 설명 섹션 */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              간단한 3단계로 시작하세요
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  블로그 선택
                </h4>
                <p className="text-gray-600">
                  관심 있는 기술 블로그를 선택하세요
                </p>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  이메일 입력
                </h4>
                <p className="text-gray-600">
                  알림을 받을 이메일 주소를 입력하세요
                </p>
              </motion.div>
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  매일 받기
                </h4>
                <p className="text-gray-600">
                  매일 오전 7시에 정리된 새 글을 받으세요
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
