'use client';

import React, { useMemo, useState } from 'react';
import { EventList } from '@/lib/eventList';
import formatDate from '@/utils/formatDate';
import Container from '@/components/Container/container';
import Heading from '@/components/design/Heading';
import Tittle from '@/components/design/Tittle';
import EventProb from '@/components/main/projects/eventPost';
import Contact from '@/components/design/formResgister';
import { NotiPostNull, NotiPostError } from '@/components/design/index';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import Pagination from '@/components/Pagination/Pagination';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0);
  const [status] = useState('open'); // Đây là status bạn muốn truyền vào

  const {
    queueData: event,
    isLoading,
    isError,
    count = 0,
  } = EventList(currentPage, status, refreshKey);

  const dataSource = useMemo(() => event, [event]);

  if (isError) return <NotiPostError />;

  const itemsPerPage = 9;
  const totalPages = Math.ceil(event.length / itemsPerPage);

  const paginatedEvents = dataSource.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Container>
      <Heading name="Dòng Chảy Hoạt Động & Sự Kiện" />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tittle name="CÁC SỰ KIỆN SẮP DIỄN RA" />
        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(count)
              .fill(0)
              .map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          </div>
        ) : count === 0 ? (
          <NotiPostNull />
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEvents.map((event, index) => (
              <EventProb
                key={index}
                id={event.id}
                title={event.title}
                date={formatDate(event.created_date)}
                image={event?.image || ''}
              />
            ))}
          </div>
        )}
        {count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <Contact />
    </Container>
  );
};

export default Page;
