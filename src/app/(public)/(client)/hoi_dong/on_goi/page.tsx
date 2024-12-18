'use client';

import React, { useState } from 'react';
import Container from '@/app/components/Container/container';
import { EventList } from '@/lib/eventList';
import OnGoiProb from '@/app/components/main/on_goi/onGoiProb';
import formatDate from '@/utils/formatDate';
import { FaArrowLeft, FaArrowRight } from '@/lib/iconLib';
import Heading from '@/app/components/design/Heading';

const OnGoiPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức từ API
  const {
    queueData: vocation,
    next,
    isLoading,
    isError,
  } = EventList(currentPage, 'vocation', refreshKey);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading news...</p>;

  const totalPages = next ? currentPage + 1 : currentPage;

  return (
    <Container>
      {/* Programs Section */}
      <section className="">
        <Heading name="Các Chương Trình Ơn Gọi" />
        <p className="mt-2 text-16 text-center text-gray-600">
          Chúng tôi mời bạn cùng khám phá hành trình ơn gọi của mình và tìm thấy
          mục đích trong cuộc sống.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vocation.map((event, index) => (
            <OnGoiProb
              key={index}
              id={event.id}
              title={event.title}
              date={formatDate(event.created_date)}
              image={event?.image || ''}
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
              className={`w-6 h-6 text-10 rounded-full hover:bg-gray-300 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
      </section>
    </Container>
  );
};

export default OnGoiPage;
