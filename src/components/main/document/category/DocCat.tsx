'use client';

import React, { Suspense, useMemo, useState } from 'react';
import formatDate from '@/utils/formatDate';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import Container from '@/components/Container/container';
import { DocList } from '@/lib/docList';
import Pagination from '@/components/Pagination/Pagination';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { NotiPostNull, NotiPostError } from '@/components/design/index';

const LazyPostProb = React.lazy(() => import('../DocProb'));

const DocsCat = () => {
  const { id: catId } = useParams();
  const categoryId = Array.isArray(catId) ? catId[0] : catId;

  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức từ API
  const {
    queueData: document,
    next,
    isLoading,
    isError,
    count = 0,
  } = DocList(currentPage, categoryId, refreshKey);
  const dataSource = useMemo(() => document, [document]);

  if (!isLoading && count === 0) return <NotiPostNull />;
  if (isError) return <NotiPostError />;

  const totalPages = next ? currentPage + 1 : currentPage;

  return (
    <main>
      <Container>
        {/* Animating news list with framer-motion */}
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
            : dataSource.map((blog, index) => (
                <Suspense
                  fallback={<div className="opacity-0"></div>}
                  key={index}
                >
                  <LazyPostProb
                    key={index}
                    id={blog.id}
                    title={blog.title}
                    description={blog.description}
                    date={formatDate(blog.created_date)}
                    author={blog.user.username}
                    category={blog.category.name}
                    image={blog.image}
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

export default DocsCat;
