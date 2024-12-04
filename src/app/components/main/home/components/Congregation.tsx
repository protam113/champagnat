'use client'; // Ensures this is a client component

import Image from 'next/image';
import React, { useState } from 'react';
import { BlogList } from '@/lib/blogList'; // Đảm bảo rằng bạn đã có BlogList API
import formatDate from '@/ultis/formatDate';

export const Congregation = () => {
  const [currentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức từ API
  const { queueData, isLoading, isError } = BlogList(
    currentPage,
    '',
    refreshKey,
  );

  // Kiểm tra dữ liệu
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading news...</p>;

  // Chỉ lấy 5 bài viết mới nhất
  const latestPosts = queueData?.slice(0, 5) || [];
  const featuredPost = latestPosts[0]; // Bài viết nổi bật
  const recentPosts = latestPosts.slice(1); // Các bài viết còn lại

  return (
    <>
      {/* Phần header của Tin Tức */}
      <div className="flex justify-between pt-5 cursor-pointer">
        {/* Bài viết đầu tiên */}
        <div>
          <Image
            src={featuredPost.image}
            alt={featuredPost?.title || 'news'}
            width={700}
            height={300}
          />
          <h3 className="mt-4 text-sm font-bold">{featuredPost?.title}</h3>
          <p className="mt-1 text-sm">
            {featuredPost?.content?.slice(0, 150)}...
            <button className="text-black font-semibold">Xem Thêm</button>
          </p>
        </div>

        {/* 4 bài viết tiếp theo */}
        <div className="grid gap-3">
          {recentPosts.map((post, index) => (
            <div
              key={index}
              className="rounded-lg flex items-start justify-between gap-2 bg-secondary-50"
            >
              <Image
                src={post.image}
                alt="News Image"
                width={130}
                height={100}
                objectFit="cover"
                className="rounded-md"
              />
              <div className="w-50">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-xs">{post.user.username}</p>
                  <p>•</p>
                  <p className="text-[#9C9C9C] text-xs">
                    {formatDate(post.created_date)}
                  </p>
                </div>
                <h4 className="font-semibold">{post.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
