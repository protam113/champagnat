'use client'; // Ensures this is a client component

import React, { useState } from 'react';
import { BlogList } from '@/lib/blogList'; // Đảm bảo rằng bạn đã có BlogList API
import BlogProb from '../../blog/blogProb';
import formatDate from '@/utils/formatDate';

export const Congregation = () => {
  const [currentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức từ API
  const {
    queueData: blogs,
    isLoading,
    isError,
  } = BlogList(currentPage, '', refreshKey);

  // Kiểm tra dữ liệu
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading news...</p>;

  const latestPosts = blogs?.slice(0, 6) || [];

  return (
    <>
      <div className="pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((blog, index) => (
            <BlogProb
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
        </div>
      </div>
    </>
  );
};
