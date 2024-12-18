'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import formatDate from '@/utils/formatDate';
import Container from '../../Container/container';
import Tittle from '../../design/Tittle';
import { NewsList } from '@/lib/newList';

const RecentNewPosts = () => {
  const [currentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức từ API
  const {
    queueData: news,
    isLoading,
    isError,
  } = NewsList(currentPage, '', refreshKey);

  const latestPost = news[0];
  const otherPosts = news.slice(1, 4);

  // Kiểm tra dữ liệu
  if (isLoading) return <div className="text-white">isloading</div>;
  if (isError) return <p>Error loading news...</p>;

  return (
    <main className="pb-20">
      <Container>
        <Tittle name="TIN TỨC GẦN ĐÂY" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Bài viết nổi bật bên trái */}
          <div className="cursor-pointer lg:col-span-2 rounded-lg shadow-lg overflow-hidden bg-white hover:text-amber-500 ">
            <div className="h-full flex flex-col">
              {/* Hình ảnh bài viết nổi bật */}
              <div className="relative w-full h-60 group">
                {latestPost?.image && (
                  <Image
                    src={latestPost.image}
                    alt={latestPost.title || 'No Title'}
                    layout="fill" // Giữ tỷ lệ ảnh phù hợp với container
                    objectFit="cover" // Đảm bảo ảnh không bị kéo dãn
                    className="rounded-t-lg transform transition-transform duration-300 group-hover:scale-110"
                  />
                )}
              </div>
              {/* Nội dung bài viết nổi bật */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-2">
                  {latestPost.categories.map((category) => (
                    <span
                      key={category.id}
                      className="text-12 bg-primary-800 text-white rounded-full px-2 py-1"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm">
                  {latestPost.user?.username} •{' '}
                  {formatDate(latestPost.created_date)}
                </p>
                <h3 className="text-2xl font-bold my-2">{latestPost.title}</h3>
                <p className="text-gray-700 text-sm flex-grow line-clamp-4">
                  {latestPost.description}
                </p>
              </div>
            </div>
          </div>

          {/* Các bài viết khác bên phải */}
          <div className="cursor-pointer flex flex-col space-y-4">
            {otherPosts.slice(0, 3).map((post, index) => (
              <div
                key={index}
                className="flex rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-2xl hover:scale-105 transform transition-all duration-300 hover:text-amber-500"
              >
                <div className="relative w-1/3 h-full">
                  {post?.image && (
                    <Image
                      src={post.image}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-l-lg"
                    />
                  )}
                </div>
                <div className="p-4 flex-1">
                  <p className="text-gray-500 text-sm">
                    {post.user.username} • {formatDate(post.created_date)}
                  </p>
                  <h4 className="text-lg font-semibold">{post.title}</h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.categories.map((category) => (
                      <span
                        key={category.id}
                        className="text-12 bg-primary-800 text-white rounded-full px-2 py-1"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default RecentNewPosts;
