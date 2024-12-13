'use client'; // Ensures this is a client component

import React, { useState } from 'react';
import formatDate from '@/utils/formatDate';
import { EventList } from '@/lib/eventList';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import VocationProb from './prob/VocationProb';

export const Vocation = () => {
  const [currentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức từ API
  const {
    queueData: blogs,
    isLoading,
    isError,
  } = EventList(currentPage, 'vocation', refreshKey);

  // Kiểm tra dữ liệu
  if (isLoading) return <Spin indicator={<LoadingOutlined spin />} />;
  if (isError) return null;

  const latestPosts = blogs?.slice(0, 6) || [];

  return (
    <>
      <div className="pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-10">
          {latestPosts.map((blog, index) => (
            <VocationProb
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
