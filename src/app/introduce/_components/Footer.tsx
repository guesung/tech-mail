"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 브랜드 정보 */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Tech Mail
              </span>
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              관심 있는 기술 블로그의 새 글을 이메일로 받아보세요. 언제 어디서든
              편리하게 최신 기술 트렌드를 확인할 수 있습니다.
            </p>
          </motion.div>
        </div>

        {/* 구분선 */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Tech Mail. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
