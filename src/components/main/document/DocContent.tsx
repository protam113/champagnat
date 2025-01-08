'use client';

import { useState } from 'react';
import formatDate from '@/utils/formatDate';
import { FaArrowLeft, FaArrowRight } from '@/lib/iconLib';
import Container from '../../Container/container';
import { ClipLoader } from 'react-spinners';
import Tittle from '@/components/design/Tittle';
import { motion } from 'framer-motion';
import DocProb from './DocProb';
import { DocList } from '@/lib/docList';
import { CategoriesList } from '@/lib/categoriesList';
import Category from '@/components/design/category';

const DocContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0);
  const [selectedCategory] = useState<string | null>(null);

  const categoryQuery = selectedCategory ? selectedCategory : '';
  const {
    queueData,
    isLoading: isCatLoading,
    isError: isCatError,
  } = CategoriesList(currentPage, 'document', 0);
  // Lấy danh sách tin tức từ API
  const {
    queueData: document,
    next,
    isLoading,
    isError,
  } = DocList(currentPage, categoryQuery, refreshKey);

  // Kiểm tra dữ liệu
  if (isLoading || isCatLoading)
    return (
      <div>
        <div className="text-center">
          <ClipLoader size="20" loading={isLoading} />
        </div>
      </div>
    );
  if (isError || isCatError) return <p>Error loading news...</p>;
  const totalPages = next ? currentPage + 1 : currentPage;

  return (
    <main>
      <Container>
        <Tittle name="TẤT CẢ TÀI LIỆU" />
        <div className="mt-6 mb-4">
          <Category queueData={queueData} model="document" />
        </div>

        {/* Animating news list with framer-motion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {document.map((blog, index) => (
            <DocProb
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

export default DocContent;
