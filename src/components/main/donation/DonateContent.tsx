'use client';

import { useMemo, useState } from 'react';

import formatDate from '@/utils/formatDate';
import { FaArrowLeft, FaArrowRight } from '@/lib/iconLib';
import Container from '../../Container/container';
import DonateProb from './donateProb';
import { DonateList } from '@/lib/donateList';
import Tittle from '@/components/design/Tittle';
import { NotiPostNull, NotiPostError } from '@/components/design/index';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';

const DonateContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức từ API
  const {
    queueData: donate,
    next,
    isLoading,
    isError,
    count = 0,
  } = DonateList(currentPage, '', refreshKey);
  const dataSource = useMemo(() => donate, [donate]);

  // Kiểm tra dữ liệu
  if (isError) return <NotiPostError />;

  if (!isLoading && count === 0) return <NotiPostNull />;

  const totalPages = next ? currentPage + 1 : currentPage;

  return (
    <Container>
      <Tittle name="HÀNH TRÌNH QUYÊN GÓP CỦA CHÚNG TÔI" />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(count)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />) // Hiển thị skeletons
          : dataSource.map((blog, index) => (
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
      {count > 0 && (
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
      )}
    </Container>
  );
};

export default DonateContent;
