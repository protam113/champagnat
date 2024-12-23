'use client';

import { useState } from 'react';
import formatDate from '@/utils/formatDate';
import { FaArrowLeft, FaArrowRight } from '@/lib/iconLib';
import Container from '../../Container/container';
import { ClipLoader } from 'react-spinners';
import SuvuProb from './suvuProb';
import SuvuTag from './SuvuCatetoryTag';
import { MissionList } from '@/lib/missionList';
import Tittle from '@/components/design/Tittle';
import { motion } from 'framer-motion';

const SuvuContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryQuery = selectedCategory ? selectedCategory : '';

  // Lấy danh sách tin tức từ API
  const {
    queueData: su_vu,
    next,
    isLoading,
    isError,
  } = MissionList(currentPage, categoryQuery, refreshKey);

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

  // Cập nhật thể loại được chọn
  const handleFilterChange = (categories: string[]) => {
    // Chỉ lấy một danh mục duy nhất
    setSelectedCategory(categories[0] || null);
  };

  const totalPages = next ? currentPage + 1 : currentPage;

  return (
    <main>
      <Container>
        <Tittle name="TẤT CẢ SỨ VỤ" />
        <div className="mt-6 mb-4">
          <SuvuTag
            onFilterChange={handleFilterChange}
            setRefreshKey={setRefreshKey}
          />
        </div>

        {/* Add motion for smooth transition of the content grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {su_vu.map((suvu, index) => (
            <SuvuProb
              key={index}
              id={suvu.id}
              title={suvu.title}
              description={suvu.description}
              date={formatDate(suvu.created_date)}
              author={suvu.user.username}
              categories={suvu.category.name}
              image={suvu.image}
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

export default SuvuContent;
