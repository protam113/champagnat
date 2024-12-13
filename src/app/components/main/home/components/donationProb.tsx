'use client'; // Ensures this is a client component

import React, { useState } from 'react';
import formatDate from '@/utils/formatDate';
import { DonateList } from '@/lib/donateList';
import DonateProb from '../../donation/donateProb';

export const Donation = () => {
  const [currentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức từ API
  const {
    queueData: blogs,
    isLoading,
    isError,
  } = DonateList(currentPage, '', refreshKey);

  // Kiểm tra dữ liệu
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading news...</p>;

  const latestPosts = blogs?.slice(0, 4) || [];

  return (
    <>
      <div className="pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-10">
          {latestPosts.map((blog, index) => (
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
      </div>
    </>
  );
};
