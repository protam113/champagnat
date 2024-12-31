'use client';

import React, { useState } from 'react';
import { Image } from 'antd';

import { GaleryList } from '@/lib/galeryList';
import { ClipLoader } from 'react-spinners';

const QuyenGopGallery = () => {
  const [currentPage] = useState(1);

  const { queueData, isLoading, isError } = GaleryList(currentPage, 'blogs', 0);

  if (isError) {
    console.error('Error fetching categories');
    return <div>Error fetching categories</div>;
  }

  if (isLoading)
    return (
      <div className="text-center">
        <ClipLoader size="20" loading={isLoading} />
      </div>
    );
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  pt-5">
        {queueData.map((queueData, index) => (
          <div key={index} className="relative w-full h-full">
            <Image
              alt={`Image ${index + 1}`}
              src={queueData.image} // Sử dụng src trực tiếp
              width={380} // Đặt kích thước chiều rộng
              height={200} // Đặt kích thước chiều cao
              className="object-cover" // Đảm bảo hình ảnh được cắt tỉa đúng tỷ lệ
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuyenGopGallery;
