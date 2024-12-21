'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DocList } from '@/lib/docList';
import logo from '@/assets/image/logo_default.png';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface StudyContentProps {
  refreshKey: number;
  category: string;
}

const StudyContent = ({ refreshKey, category }: StudyContentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { queueData, isLoading } = DocList(currentPage, category, refreshKey);

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
        <div className="mt-8 flex justify-center cursor-pointer">
          <div className="inline-flex items-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 hover:border-primary-500 hover:text-primary-500 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all duration-300"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary-500 text-white font-medium">
              {currentPage}
            </span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={queueData.length < 10}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 hover:border-primary-500 hover:text-primary-500 disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:text-gray-400 transition-all duration-300"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyContent;
