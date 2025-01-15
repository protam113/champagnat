'use client';

import { useState, useMemo } from 'react';
import formatDate from '@/utils/formatDate';
import { FaArrowLeft, FaArrowRight } from '@/lib/iconLib';
import Container from '../../Container/container';
import { NewsList } from '@/lib/newList';
import { ClipLoader } from 'react-spinners';
import NewProb from './newProb';
import NewsTag from './NewCatetoryTag';
import Tittle from '@/components/design/Tittle';
import { motion } from 'framer-motion';

const NewContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0);
  const [selectedCategory] = useState<string | null>(null);

  const categoryQuery = selectedCategory ? selectedCategory : '';

  // Lấy danh sách tin tức từ API
  const {
    queueData: news,
    next,
    isLoading,
    isError,
  } = NewsList(currentPage, categoryQuery, refreshKey);
  const dataSource = useMemo(() => news, [news]);
  // Kiểm tra dữ liệu
  if (isLoading)
    return (
      <div>
        <div className="text-center">
          <ClipLoader size="20" loading={isLoading} />
        </div>
      </div>
    );
  if (isError) return <p>Error loading news...</p>;

  const totalPages = next ? currentPage + 1 : currentPage;

  return (
    <main>
      <Container>
        <Tittle name="TẤT CẢ TIN TỨC" />
        <div className="mt-6 mb-4">
          <NewsTag />
        </div>

        {/* Animating news list with framer-motion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dataSource.map((blog, index) => (
            <NewProb
              key={index}
              id={blog.id}
              title={blog.title}
              description={blog.description}
              date={formatDate(blog.created_date)}
              author={blog.user.username}
              categories={blog.categories.map((category) => category.name)}
              image={blog.image}
            />
          ))}
        </motion.div>

        <div className="flex justify-center mt-8 items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-6 h-6 text-10 bg-gray-200 rounded-full hover:bg-gray-300 ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaArrowLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-6 h-6 text-10 rounded-full hover:bg-gray-300 ${currentPage === i + 1 ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={!next}
            className={`flex items-center justify-center w-6 h-6 text-10 bg-gray-200 rounded-full hover:bg-gray-300 ${
              !next ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      </Container>
    </main>
  );
};

export default NewContent;
