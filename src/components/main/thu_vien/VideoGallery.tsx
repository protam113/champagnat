'use client';

import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useVideoList } from '@/hooks/video/useVideo';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const VideoGallery = () => {
  const [currentPage] = useState(1);
  const { data, isLoading, isError } = useVideoList(currentPage, 0);
  const queueData = data?.data || [];

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-gray-800 px-6 py-4 max-w-md text-center">
          <h2 className="text-lg font-semibold mb-2">Oops, có lỗi xảy ra!</h2>
          <p className="text-sm mb-4">
            Chúng tôi không thể lấy dữ liệu hình ảnh ngay bây giờ. Vui lòng thử
            lại sau.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="text-center">
        <ClipLoader size="20" loading={isLoading} />
      </div>
    );

  return (
    <div>
      <div className="pt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {queueData.map((video, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            {/* Phần hình ảnh */}
            <div className="relative">
              <Image
                alt={`Image ${index + 1}`}
                src={video.image}
                width={410}
                height={230}
                className="object-cover w-full h-56"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-primary-500 hover:bg-yellow-500 text-white transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3l14 9-14 9V3z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Phần nội dung */}
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {video.content}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{video.create_date}</p>
              {/* <a
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center text-primary-500 text-16 sm:text-16 md:text-18 lo:text-20 font-semibold group transition duration-300 overflow-hidden"
              >
                <span className="absolute left-0 top-0 h-full w-1 bg-primary-500"></span>

                <span className="relative z-10 pl-4">Xem Thêm</span>

                <span className="relative z-10 ml-1 transition-transform group-hover:translate-x-1">
                  →
                </span>

                <span className="absolute inset-0 bg-yellow-500 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a> */}
              <button
                className={`group relative rounded-full border border-white bg-white p-2 text-16 font-semibold `}
              >
                <div className="absolute bg-primary-500 left-0 top-0 flex h-full w-11 items-center justify-end rounded-full transition-all duration-200 ease-in-out group-hover:w-full">
                  <span className="mr-3 text-white transition-all duration-200 ease-in-out">
                    <ArrowRight size={20} />
                  </span>
                </div>
                <span className="relative left-4 z-10 whitespace-nowrap px-8 font-semibold text-black transition-all duration-200 ease-in-out group-hover:-left-3 group-hover:text-yellow-500">
                  xem thêm{' '}
                </span>
              </button>
            </div>

            {/* Các nút chức năng */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
