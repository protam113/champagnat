import React from 'react';

const PostDetailSkeleton = () => {
  return (
    <div className="col-span-12 lg:col-span-8">
      {/* Skeleton for Title */}
      <div className="col-span-12 lg:col-span-8">
        <div className="flex flex-col gap-4">
          {/* Title Skeleton */}
          <div className="bg-gray-300 w-2/3 h-8 rounded-md mx-auto"></div>

          {/* Author and Date Skeleton */}
          <div className="flex items-center justify-center text-gray-500 text-sm">
            <div className="bg-gray-300 w-1/4 h-4 rounded-md mr-4"></div>
            <div className="bg-gray-300 w-1/4 h-4 rounded-md"></div>
          </div>

          {/* Description Skeleton */}
          <div className="bg-gray-300 w-3/4 h-6 rounded-md mx-auto mt-2"></div>

          {/* Image Skeleton */}
          <div className="mt-8 w-full max-w-3xl mx-auto">
            <div className="bg-gray-300 w-full h-56 rounded-xl"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="flex flex-col gap-8 mt-12">
          {/* Content Skeleton */}
          <div className="bg-gray-300 w-4/5 h-8 rounded-md mx-auto"></div>
          <div className="bg-gray-300 w-3/4 h-8 rounded-md mx-auto"></div>
          <div className="bg-gray-300 w-2/3 h-8 rounded-md mx-auto"></div>

          {/* Media Skeleton */}
          <div className="text-blue-800 mr-4 text-16">
            {/* Skeleton for PDF */}
            <div className="bg-gray-300 w-full h-80 rounded-md mt-4"></div>
            {/* Skeleton for Images */}
            <div className="bg-gray-300 w-full h-56 rounded-md mt-4"></div>
          </div>

          {/* Source Skeleton */}
          <div className="mt-6">
            <div className="bg-gray-300 w-1/4 h-4 rounded-md"></div>
            <div className="bg-gray-300 w-1/3 h-4 rounded-md mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailSkeleton;
