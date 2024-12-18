'use client';

import { useState } from 'react';

import Tittle from '@/app/components/design/Tittle';
import formatDate from '@/utils/formatDate';
import { FaArrowLeft, FaArrowRight } from '@/lib/iconLib';
import Container from '../../Container/container';
import { ClipLoader } from 'react-spinners';
import DonateProb from './donateProb';
import { DonateList } from '@/lib/donateList';

const DonateContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức từ API
  const {
    queueData: donate,
    next,
    isLoading,
    isError,
  } = DonateList(currentPage, '', refreshKey);
  console.log(donate);
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
    <Container>
      <Tittle name="HÀNH TRÌNH QUYÊN GÓP CỦA CHÚNG TÔI" />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {donate.map((blog, index) => (
          <DonateProb
            key={index}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            date={formatDate(blog.created_date)}
            image={blog.image}
          />
        ))}
      </div>
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
  );
};

export default DonateContent;
