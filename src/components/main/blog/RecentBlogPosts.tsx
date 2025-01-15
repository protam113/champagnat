'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { BlogList } from '@/lib/blogList';
import formatDate from '@/utils/formatDate';

import Container from '../../Container/container';
import Tittle from '../../design/Tittle';
import { FaCross } from '@/lib/iconLib';
import Link from 'next/link';
import { Spline } from 'lucide-react';

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
  if (isLoading) return <Spline className="text-white" />;
  if (isError) return null;

  if (blogs.length === 0) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center h-full text-center pt-10">
          <FaCross className="text-6xl text-gray-400 mb-4" />
          <p className="text-lg text-gray-600">
            Hiện tại chưa có bài viết nào. Vui lòng quay lại sau!
          </p>
        </div>
      </Container>
    );
  }

  return (
    <main className="pb-20">
      <Container>
        <Tittle name="BÀI VIẾT GẦN ĐÂY" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Bài viết nổi bật bên trái */}
          <Link
            href={`/blog/${latestPost.id}`}
            className="cursor-pointer lg:col-span-2 rounded-lg shadow-lg overflow-hidden bg-white hover:text-amber-500 "
          >
            <div className="h-full flex flex-col">
              {/* Hình ảnh bài viết nổi bật */}
              <div className="relative w-full h-60 overflow-hidden group">
                {latestPost?.image && (
                  <Image
                    src={latestPost.image}
                    alt={latestPost.title || 'No Title'}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg transform transition-transform duration-300 group-hover:scale-110"
                  />
                )}
              </div>

              {/* Nội dung bài viết nổi bật */}
              <div className="p-6 flex-1 flex flex-col ">
                <div className="flex flex-wrap gap-2 mb-2">
                  {latestPost.categories.map((category) => (
                    <span
                      key={category.id}
                      className="text-xs bg-primary-800 text-white rounded-full px-2 py-1"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm">
                  {latestPost.user.username} •{' '}
                  {formatDate(latestPost.created_date)}
                </p>
                <h3 className="text-2xl font-bold my-2">{latestPost.title}</h3>
                <p className="text-gray-700 text-sm flex-grow line-clamp-4">
                  {latestPost.description}
                </p>
              </div>
            </div>
          </Link>

          {/* Các bài viết khác bên phải */}
          <div className="cursor-pointer flex flex-col space-y-4">
            {otherPosts.slice(0, 3).map((post, index) => (
              <Link
                key={index}
                href={`/blog/${latestPost.id}`}
                className="flex rounded-lg shadow-lg overflow-hidden bg-white h-auto hover:shadow-2xl hover:scale-105 hover:text-yellow-500 transform transition-all duration-300"
              >
                <div className="relative w-1/3 h-40 md:h-48 lg:h-40">
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
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.categories.map((category) => (
                      <span
                        key={category.id}
                        className="text-12 bg-primary-800 text-white rounded-full px-2 py-1"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm">
                    {post.user.username} • {formatDate(post.created_date)}
                  </p>
                  <h2 className="text-14 font-semibold">{post.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
};

export default RecentBlogPosts;
