"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "Tech Mail은 어떻게 작동하나요?",
    answer:
      "Tech Mail은 RSS 피드를 활용하여 기술 블로그의 새 글을 모니터링합니다. 매일 오전 8시에 모은 새 글들을 정리해서 이메일로 전송합니다.",
  },
  {
    question: "이메일은 언제 오나요?",
    answer:
      "매일 오전 8시에 전날 수집된 모든 새 글을 정리해서 일괄 전송합니다. 이렇게 하면 이메일 알림이 너무 많아지지 않고 깔끔하게 확인할 수 있어요.",
  },
  {
    question: "구독은 무료인가요?",
    answer:
      "네, Tech Mail의 모든 기능은 완전히 무료로 제공됩니다. 별도의 비용 없이 원하는 만큼 많은 블로그를 구독할 수 있습니다.",
  },
  {
    question: "언제든지 구독을 해지할 수 있나요?",
    answer:
      "물론입니다! 언제든지 이메일 하단의 구독 해지 링크를 클릭하거나 설정에서 구독을 해지할 수 있습니다.",
  },
  {
    question: "어떤 기술 블로그를 구독할 수 있나요?",
    answer:
      "토스, 카카오, 네이버 등 유명 기업들의 기술 블로그부터 개인 개발자들의 블로그까지 다양한 기술 블로그를 구독할 수 있습니다.",
  },
  {
    question: "개인정보는 안전한가요?",
    answer:
      "네, 이메일 주소는 암호화되어 안전하게 보관됩니다. 제3자에게 제공되지 않으며, 서비스 목적으로만 사용됩니다.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            자주 묻는 질문들
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tech Mail에 대해 궁금한 점들을 확인해보세요
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-3xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  className="text-2xl text-gray-400 flex-shrink-0"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  +
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* 추가 도움말 */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              더 궁금한 점이 있나요?
            </h3>
            <p className="text-gray-600 mb-6">
              추가 문의사항이 있으시면 언제든지 연락해주세요
            </p>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open("https://open.kakao.com/o/s9kcjdJh", "_blank")
              }
            >
              문의하기
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
