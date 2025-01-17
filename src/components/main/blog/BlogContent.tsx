'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { BlogList } from '@/lib/blogList';
import formatDate from '@/utils/formatDate';
import Container from '../../Container/container';
import Tittle from '@/components/design/Tittle';
import { motion } from 'framer-motion';
import { NotiPostNull, NotiPostError } from '@/components/design/index';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import Pagination from '@/components/Pagination/Pagination';
import CategoryTag from '@/components/category/CategoryTag';

const LazyPostProb = React.lazy(() => import('./blogProb'));

const BlogContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0);
  const [selectedCategory] = useState<string | null>(null);

  const categoryQuery = selectedCategory ? selectedCategory : '';

  // Lấy danh sách tin tức từ API
  const {
    queueData: blogs,
    next,
    isLoading,
    isError,
    count = 0,
  } = BlogList(currentPage, categoryQuery, refreshKey);
  const dataSource = useMemo(() => blogs, [blogs]);
  // Kiểm tra dữ liệu
  if (isError) return <NotiPostError />;

  if (!isLoading && count === 0) return <NotiPostNull />;

  const totalPages = next ? currentPage + 1 : currentPage;

  return (
    <main>
      <Container>
        <Tittle name="TẤT CẢ BÀI VIẾT" />
        <div className="mt-6 mb-4">
          <CategoryTag model="blog" href="/blog/category" />
        </div>
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
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
                    categories={blog.categories.map(
                      (category) => category.name,
                    )}
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

export default BlogContent;
