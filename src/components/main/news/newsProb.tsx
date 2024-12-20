'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NewsList } from '@/lib/newList';
import { Pagination } from 'antd';
import Link from 'next/link';
import Image from 'next/image';

const NewsProb = ({
  selectedCategories,
  refreshKey,
}: {
  selectedCategories: string[];
  refreshKey: number;
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const categoryQuery =
    selectedCategories.length > 0 ? selectedCategories.join(',') : '';

  // Lấy danh sách tin tức
  const { queueData, isLoading, isError } = NewsList(
    currentPage,
    categoryQuery, // Truyền id vào để lọc theo thể loại
    refreshKey, // Truyền refreshKey vào
  );

  // Kiểm tra dữ liệu
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading news...</p>;

  return (
    <div className="flex-1 border border-gray-200 rounded-lg p-4">
      {/* Latest Posts Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {queueData.map((post, index) => (
          <Link
            href={`/new/${post.id}`}
            key={index}
            className="bg-white shadow rounded-lg overflow-hidden h-full w-full"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              {/* Cập nhật link đến trang chi tiết */}
              <Link href={`/post/${post.link.split('-')[1]}`}>
                <h3 className="font-bold text-16 line-clamp-2 pb-2 transition-colors duration-300 hover:text-yellow-500">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm line-clamp-3">
                {post.description}
              </p>
              <h3 className=" text-14 line-clamp-2 pb-2 transition-colors duration-300 hover:text-yellow-500">
                {post.categories?.map((category) => category.name).join(', ')}
              </h3>

              <Link
                href={`/post/${post.link.split('-')[1]}`}
                className="text-accent mt-4 inline-block hover:text-yellow-500"
              >
                Đọc Thêm
              </Link>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 items-center space-x-2">
        <Pagination
          current={currentPage} // Trang hiện tại
          onChange={(page) => {
            setCurrentPage(page); // Cập nhật trang hiện tại
          }}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default NewsProb;
