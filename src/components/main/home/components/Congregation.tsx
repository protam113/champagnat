'use client'; // Đảm bảo đây là client component

import React, { useState } from 'react';
import { BlogList } from '@/lib/blogList';
import BlogProb from '../../blog/blogProb';
import formatDate from '@/utils/formatDate';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Congregation = () => {
  const [currentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức từ API
  const {
    queueData: blogs,
    isLoading,
    isError,
  } = BlogList(currentPage, '', refreshKey);

  // Xử lý trạng thái tải hoặc lỗi
  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <Spin indicator={<LoadingOutlined spin />} />
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center py-10">
        <p className="text-red-500">
          Không thể tải dữ liệu. Vui lòng thử lại sau.
        </p>
      </div>
    );

  // Lấy bài viết mới nhất
  const latestPosts = blogs?.slice(0, 6) || [];

  return (
    <div className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {latestPosts.map((blog) => (
          <BlogProb
            key={blog.id}
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
  );
};

export default Congregation;
