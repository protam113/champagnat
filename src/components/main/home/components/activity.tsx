'use client'; // Ensures this is a client component

import React, { useState } from 'react';
import formatDate from '@/utils/formatDate';
import { EventList } from '@/lib/eventList';
import EventProb from './prob/EventProb';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const Activity = () => {
  const [currentPage] = useState(1);
  const [refreshKey] = useState(0);

  const {
    queueData: blogs,
    isLoading,
    isError,
  } = EventList(currentPage, 'event', refreshKey);

  if (isLoading) return <Spin indicator={<LoadingOutlined spin />} />;
  if (isError) return null;

  const latestPosts = blogs?.slice(0, 6) || [];

  return (
    <>
      <div className="pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-10">
          {latestPosts.map((blog, index) => (
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
