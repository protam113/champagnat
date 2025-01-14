'use client';

import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useVideoList } from '@/hooks/video/useVideo';
import Image from 'next/image';

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
      <div className="pt-10 grid grid-cols-1 gap-6">
        {queueData.map((queueData, index) => (
          <div
            key={index}
            className="flex lg:flex-row flex-col bg-[#EBEBEB] rounded-lg shadow-lg hover:shadow-2xl transition-all ease-in-out duration-300 overflow-hidden"
          >
            <div className="relative">
              <Image
                alt={`Image ${index + 1}`}
                src={queueData.image}
                width={410}
                height={210}
                className="object-cover w-full h-48" // Điều chỉnh chiều cao ảnh
              />
              {/* Nút Play ở giữa ảnh */}
              <div className="absolute inset-0 flex justify-center items-center">
                <a
                  href={queueData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-full bg-primary-500 opacity-50 hover:opacity-75 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
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

            <div className="p-4">
              <p className="text-20 text-primary-500 font-semibold">
                {queueData.content}
              </p>
              <span>{queueData.create_date}</span>

              {/* Nút "READ MORE" */}
              <a
                href={queueData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-max flex items-center mt-4 p-2 rounded-md text-primary-500 font-semibold relative overflow-hidden border-2 border-primary-500"
              >
                {/* Chữ sẽ chuyển sang màu trắng khi hover */}
                <span className="text-14 group-hover:text-white transition-all duration-300 z-10 relative">
                  Xem Thêm
                </span>
                {/* Thêm mũi tên với hiệu ứng animation */}
                <svg
                  className="relative z-10 inline-block ml-2 w-5 h-5 group-hover:text-white transition-all duration-300 transform group-hover:translate-x-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
                {/* Hiệu ứng background với chiều rộng đúng */}
                <div className="absolute inset-0 bg-primary-500 group-hover:w-full w-0 transition-all duration-300 z-0"></div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
