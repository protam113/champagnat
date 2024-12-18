'use client';

import React, { useState } from 'react';
import Heading from '@/app/components/design/Heading';
// import HeroSectionTextHover from '@/app/components/animate/hero/hero-section-text-hover';
// import InteractiveGrid from '@/app/components/animate/background/interactive-grid';
// import CarouselHero from '@/app/components/animate/hero/carousel';
import { EventList } from '@/lib/eventList';
import Tittle from '@/app/components/design/Tittle';
import EventProb from '@/app/components/main/event/eventPost';
import formatDate from '@/utils/formatDate';
import { FaArrowLeft, FaArrowRight } from '@/lib/iconLib';
import Container from '@/app/components/Container/container';
import Contact from '@/app/components/design/formResgister';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức từ API
  const {
    queueData: event,
    next,
    isLoading,
    isError,
  } = EventList(currentPage, 'event', refreshKey);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading news...</p>;

  const totalPages = next ? currentPage + 1 : currentPage;
  return (
    <Container>
      <Heading name="Dòng Chảy Hoạt Động & Sự Kiện" />
      {/* <CarouselHero
        events={event.map((item) => ({ id: item.id, image: item.image || '' }))}
      /> */}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tittle name="CÁC SỰ KIỆN SẮP DIỄN RA" />
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {event.map((event, index) => (
            <EventProb
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
      </div>

      {/* Hợp tác tổ chức sự kiện */}
      <Contact />
    </Container>
  );
};

export default Page;
