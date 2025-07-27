"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import blogsData from "@/data/blogs.json";

export default function BlogGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: "all",
      name: "전체",
      count: blogsData.filter((blog) => blog.show).length,
    },
    {
      id: "company",
      name: "기업 블로그",
      count: blogsData.filter((blog) => blog.show && blog.company).length,
    },
    {
      id: "personal",
      name: "개인 블로그",
      count: blogsData.filter((blog) => blog.show && !blog.company).length,
    },
  ];

  const filteredBlogs = blogsData.filter((blog) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "company" && blog.company) ||
      (selectedCategory === "personal" && !blog.company);

    const matchesSearch = blog.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return blog.show && matchesCategory && matchesSearch;
  });

  return (
    <section id="blogs" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            다양한 기술 블로그를 구독하세요
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            토스, 카카오, 네이버 등 유명 기업들의 기술 블로그부터 개인
            개발자들의 블로그까지 다양한 소식을 받아보세요
          </p>
        </motion.div>

        {/* 검색 및 필터 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* 검색창 */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="블로그 이름으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
            </div>

            {/* 카테고리 필터 */}
            <div className="flex gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name} ({category.count})
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 블로그 그리드 */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.name}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 text-center cursor-pointer"
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                }}
                transition={{ duration: 0.3 }}
                onClick={() => window.open(blog.url, "_blank")}
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={`/blogs/${blog.logo}`}
                    alt={blog.name}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/blogs/default.png";
                    }}
                  />
                </motion.div>

                <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                  {blog.name}
                </h3>

                <div className="flex items-center justify-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      blog.company
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {blog.company ? "기업" : "개인"}
                  </span>
                </div>

                {/* 호버 시 나타나는 추가 정보 */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div className="text-white text-center">
                    <div className="text-lg font-semibold mb-2">
                      {blog.name}
                    </div>
                    <div className="text-sm opacity-90">클릭하여 방문하기</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* 결과 없음 메시지 */}
        {filteredBlogs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-600">
              다른 검색어를 입력하거나 필터를 변경해보세요
            </p>
          </motion.div>
        )}

        {/* 통계 정보 */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              현재 구독 가능한 블로그
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {blogsData.filter((blog) => blog.show).length}
                </div>
                <div className="text-gray-600">전체 블로그</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {blogsData.filter((blog) => blog.show && blog.company).length}
                </div>
                <div className="text-gray-600">기업 블로그</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {
                    blogsData.filter((blog) => blog.show && !blog.company)
                      .length
                  }
                </div>
                <div className="text-gray-600">개인 블로그</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
