'use client';
import React, { useMemo, useState } from 'react';
import formatDate from '@/utils/formatDate';
import { EventList } from '@/lib/eventList';
import EventProb from './prob/EventProb';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { NotiPostNull, NotiPostError } from '@/components/design/index';

export const Activity = () => {
  const [status] = useState('open'); // Đây là status bạn muốn truyền vào

  // Lấy danh sách tin tức từ API
  const {
    queueData: blogs,
    isLoading,
    isError,
    count,
  } = EventList(1, status, 0);
  const dataSource = useMemo(() => blogs, [blogs]);

  const skeletonCount = 6;

  // Xử lý trạng thái lỗi
  if (isError) return <NotiPostError />;

  if (!isLoading && count === 0) return <NotiPostNull />;

  const latestPosts = dataSource?.slice(0, 6) || [];

  return (
    <>
      <div className="pt-10 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {isLoading
            ? Array(skeletonCount)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />) // Hiển thị skeletons
            : latestPosts.map((blog, index) => (
                <EventProb
                  key={index}
                  id={blog.id}
                  title={blog.title}
                  date={formatDate(blog.created_date)}
                  image={blog.image}
                />
              ))}
        </div>
      </div>
    </>
  );
};
