'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { DocList } from '@/lib/docList';
import logo from '@/assets/image/logo_default.png';

const StudyProb = ({
  refreshKey,
  category,
}: {
  refreshKey: number;
  category: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { queueData, isLoading, isError } = DocList(
    currentPage,
    category,
    refreshKey,
  );

  const handleNextPage = () => {
    if (queueData.length > 0) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-pulse">
            <div className="bg-gray-200 h-10 w-80 mb-4"></div>
            <div className="bg-gray-200 h-60 w-80 mb-4"></div>
          </div>
        </div>
      ) : isError ? (
        <div className="text-center text-lg text-red-500">
          Có lỗi xảy ra khi tải bài viết.
          <button className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
            Thử lại
          </button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {queueData.map((post) => (
            <Link
              href={`/study/${post.id}`}
              key={post.id}
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105"
            >
              <div className="relative">
                <Image
                  src={post.image || logo}
                  alt={post.title}
                  style={{ objectFit: 'cover' }}
                  className="w-full h-48 object-cover"
                  width={400}
                  height={300}
                />
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2 text-xs text-gray-500 uppercase font-semibold">
                  {Array.isArray(post.categories) &&
                    post.categories.map((category, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
                      >
                        {category.name}
                      </span>
                    ))}
                </div>
                <h2 className="text-lg font-bold text-gray-800 mt-2">
                  {post.title}
                </h2>
              </div>
            </Link>
          ))}
        </motion.div>
      )}

      <div className="flex justify-center mt-8 items-center gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full hover:bg-gray-400 ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FaArrowLeft />
        </button>
        <span className="text-16 font-semibold">{currentPage}</span>
        <button
          onClick={handleNextPage}
          disabled={queueData.length === 0 || queueData.length < 10}
          className={`flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full hover:bg-gray-400 ${
            queueData.length === 0 || queueData.length < 10
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          <FaArrowRight />
        </button>
      </div>
    </>
  );
};

export default StudyProb;
