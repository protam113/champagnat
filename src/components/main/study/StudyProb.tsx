'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DocList } from '@/lib/docList';
import logo from '@/assets/image/logo_default.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface StudyContentProps {
  refreshKey: number;
  category: string;
}

const StudyContent = ({ refreshKey, category }: StudyContentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { queueData, next, isLoading } = DocList(
    currentPage,
    category,
    refreshKey,
  );
  const totalPages = next ? currentPage + 1 : currentPage;
  return (
    <div className="flex-1">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading
          ? // Skeleton loading
            Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white rounded-xl overflow-hidden"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-4/5" />
                  </div>
                </div>
              ))
          : queueData?.map((post: any) => (
              <Link
                href={`/study/${post.id}`}
                key={post.id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image || logo}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Category tags */}
                  {/* <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                    {post.categories?.map((cat: any, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-white/90 text-gray-800 rounded-full"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div> */}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
      </div>

      {!isLoading && queueData?.length > 0 && (
        <div className="flex justify-center mt-8 items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-6 h-6 text-10 bg-gray-200 rounded-full hover:bg-gray-300 ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaArrowLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-6 h-6 text-10 rounded-full hover:bg-gray-300 ${currentPage === i + 1 ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={!next}
            className={`flex items-center justify-center w-6 h-6 text-10 bg-gray-200 rounded-full hover:bg-gray-300 ${
              !next ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default StudyContent;
