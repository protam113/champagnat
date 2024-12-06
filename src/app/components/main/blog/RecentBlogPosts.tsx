'use client';

import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import { BlogList } from '@/lib/blogList';
import formatDate from '@/ultis/formatDate';

const RecentBlogPosts = () => {
  const [currentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức từ API
  const {
    queueData: blogs,
    isLoading,
    isError,
  } = BlogList(currentPage, '', refreshKey);

  const latestPost = blogs[0];
  const otherPosts = blogs.slice(1, 4);

  // Kiểm tra dữ liệu
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading news...</p>;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Bài viết nổi bật bên trái */}
      <div className="lg:col-span-2 rounded-lg shadow-lg overflow-hidden bg-white">
        <div className="h-full flex flex-col">
          {/* Hình ảnh bài viết nổi bật */}
          <div className="h-2/3 w-full relative">
            {latestPost?.image && (
              <Image
                src={latestPost.image}
                alt={latestPost.title || 'No Title'}
                fill
                className="object-cover"
              />
            )}
          </div>
          {/* Nội dung bài viết nổi bật */}
          <div className="p-6 flex-1 flex flex-col">
            <p className="text-gray-500 text-sm">
              {latestPost.user.username} • {formatDate(latestPost.created_date)}
            </p>
            <h3 className="text-2xl font-bold my-2">{latestPost.title}</h3>
            <p className="text-gray-700 text-sm flex-grow">
              {latestPost.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {latestPost.categories.map((category) => (
                <span
                  key={category.id} // Use category.id as the key
                  className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-1"
                >
                  {category.name} {/* Display the 'name' property */}
                </span>
              ))}
            </div>

            <a
              href="#"
              className="flex items-center text-blue-500 text-sm mt-4"
            >
              Read More <FaExternalLinkAlt className="ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Các bài viết khác bên phải */}
      <div className="flex flex-col space-y-4">
        {otherPosts.slice(0, 3).map((post, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-lg shadow-lg overflow-hidden bg-white h-1/3"
          >
            <div className="h-full w-1/3 relative">
              {post?.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
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
                    className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-1"
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
  );
};

export default RecentBlogPosts;
