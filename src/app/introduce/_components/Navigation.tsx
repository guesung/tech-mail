"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 로고 */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl">📧</div>
            <span className="text-xl font-bold text-gray-900">Tech Mail</span>
          </motion.div>

          {/* 네비게이션 링크 */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.a
              href="#features"
              className={`font-medium transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white/90 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              기능
            </motion.a>
            <motion.a
              href="#blogs"
              className={`font-medium transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white/90 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              블로그
            </motion.a>
            <motion.a
              href="#faq"
              className={`font-medium transition-colors ${
                isScrolled
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white/90 hover:text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              FAQ
            </motion.a>
          </div>

          {/* CTA 버튼 */}
          <Link href="/">
            <motion.button
              className={`px-6 py-2 rounded-2xl font-semibold transition-all duration-200 ${
                isScrolled
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              시작하기
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
