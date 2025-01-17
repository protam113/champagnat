'use client';

import React, { useState, useMemo, Suspense } from 'react';
import formatDate from '@/utils/formatDate';
import Container from '../../Container/container';
import { ClipLoader } from 'react-spinners';
import { MissionList } from '@/lib/missionList';
import Tittle from '@/components/design/Tittle';
import { motion } from 'framer-motion';
import { NotiPostNull, NotiPostError } from '@/components/design/index';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import CategoryTag from '@/components/category/CategoryTag';
import Pagination from '@/components/Pagination/Pagination';

const LazyPostProb = React.lazy(() => import('./suvuProb'));

const SuvuContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0);
  const [selectedCategory] = useState<string | null>(null);

  const categoryQuery = selectedCategory ? selectedCategory : '';

  // Lấy danh sách tin tức từ API
  const {
    queueData: su_vu,
    next,
    isLoading,
    isError,
    count = 0,
  } = MissionList(currentPage, categoryQuery, refreshKey);

  const dataSource = useMemo(() => su_vu, [su_vu]);
  // Kiểm tra dữ liệu
  if (isLoading)
    return (
      <div>
        <div className="text-center">
          <ClipLoader size="20" loading={isLoading} />
        </div>
      </div>
    );
  if (isError) return <NotiPostError />;
  if (!isLoading && count === 0) return <NotiPostNull />;

  const totalPages = next ? currentPage + 1 : currentPage;

  return (
    <main>
      <Container>
        <Tittle name="TẤT CẢ SỨ VỤ" />
        <div className="mt-6 mb-4">
          <CategoryTag model="mission" href="/mission/category" />
        </div>

        {/* Add motion for smooth transition of the content grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading
            ? Array(count)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />) // Hiển thị skeletons
            : dataSource.map((suvu, index) => (
                <Suspense
                  fallback={<div className="opacity-0"></div>}
                  key={index}
                >
                  <LazyPostProb
                    key={index}
                    id={suvu.id}
                    title={suvu.title}
                    description={suvu.description}
                    date={formatDate(suvu.created_date)}
                    author={suvu.user.username}
                    category={suvu.category.name}
                    image={suvu.image}
                  />
                </Suspense>
              ))}
        </motion.div>

        {count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </Container>
    </main>
  );
};

export default SuvuContent;
