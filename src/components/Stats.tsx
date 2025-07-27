"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface StatProps {
  number: number;
  label: string;
  suffix?: string;
  color: string;
}

function Stat({ number, label, suffix = "", color }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = number / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          setCount(number);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, number]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.div
        className={`text-4xl md:text-5xl font-bold mb-2 ${color}`}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {count.toLocaleString()}
        {suffix}
      </motion.div>
      <div className="text-gray-600 font-medium">{label}</div>
    </motion.div>
  );
}

export default function Stats() {
  const stats = [
    { number: 100, label: "기술 블로그", suffix: "+", color: "text-blue-600" },
    { number: 50, label: "구독자", suffix: "K+", color: "text-purple-600" },
    { number: 1000, label: "일일 전송", suffix: "+", color: "text-green-600" },
    { number: 99, label: "만족도", suffix: "%", color: "text-orange-600" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Tech Mail의 성과
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            많은 개발자들이 Tech Mail을 통해 최신 기술 트렌드를 놓치지 않고
            있습니다
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Stat {...stat} />
            </motion.div>
          ))}
        </div>

        {/* 추가 통계 카드 */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-white p-8 rounded-3xl shadow-lg"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">성장률</h3>
            <p className="text-gray-600">월 평균 15% 성장</p>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-3xl shadow-lg"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">전송 시간</h3>
            <p className="text-gray-600">매일 오전 8시 일괄 전송</p>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-3xl shadow-lg"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">정확도</h3>
            <p className="text-gray-600">99.9% 정확한 알림</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
