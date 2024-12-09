'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Container from '../../Container/container';
import Link from 'next/link';
import { NewsList } from '@/lib/newList';
import Tittle from '../../design/Tittle';
import formatDate from '@/utils/formatDate';
import { FaCross } from '@/lib/iconLib';

const FeaturedLayout = () => {
  const [currentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức
  const { queueData, isLoading, isError } = NewsList(
    currentPage,
    '',
    refreshKey,
  );

  // Kiểm tra dữ liệua
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading news...</p>;

  // Chỉ lấy 5 bài viết mới nhất
  const latestPosts = queueData?.slice(0, 5) || [];
  const featuredPost = latestPosts[0]; // Bài viết nổi bật
  const recentPosts = latestPosts.slice(1); // Các bài viết còn lại

  if (latestPosts.length === 0) {
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
    <Container>
      <div className="pt-10">
        <Tittle name="TIN TỨC NỔI BẬT" />

        <div className="flex flex-col md:flex-row gap-4 pt-10">
          {/* Featured Post */}
          {featuredPost && (
            <div className="w-1/2 md:w-2/3 relative">
              <Image
                src={featuredPost.image}
                alt="Featured post"
                width={800}
                height={700}
                className="rounded-lg mb-3"
              />
              <p className="text-xs text-gray-500 mb-1">
                {formatDate(featuredPost.created_date)}
              </p>
              <h2 className="text-20 text-black font-bold mb-2">
                {featuredPost.title}
              </h2>
              <p className="text-sm">{featuredPost.description}</p>
            </div>
          )}

          {/* Recent Posts */}
          <div className="md:w-1/3 space-y-5">
            {recentPosts.map((post, index) => (
              <div key={post.id} className="flex gap-2 items-start shadow-md">
                <Image
                  src={post.image}
                  alt={`Recent post ${index + 1}`}
                  width={135}
                  height={135}
                />
                <div>
                  <p className="text-xs text-gray-400 mb-1">
                    {formatDate(post.created_date)}
                  </p>
                  <h3 className="text-md text-black font-semibold line-clamp-2 mb-5 leading-5">
                    {post.title}
                  </h3>
                  <Link href={`/post/${post.id}`} passHref>
                    <button className="text-white bg-primary-500 py-1 px-2 rounded-md text-xs hover:bg-yellow-500">
                      Xem Thêm
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FeaturedLayout;
