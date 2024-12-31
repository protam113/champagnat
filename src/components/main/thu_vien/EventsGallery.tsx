'use client';

import React, { useState } from 'react';
import { Image } from 'antd';

import { GaleryList } from '@/lib/galeryList';
import { ClipLoader } from 'react-spinners';

const EventsGallery = () => {
  const [currentPage] = useState(1);

  const { queueData, isLoading, isError } = GaleryList(currentPage, 'event', 0);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2 pt-5">
        {queueData.map((queueData, index) => (
          <div key={index} className="relative w-full h-full">
            <Image
              alt={`Image ${index + 1}`}
              src={queueData.image} // Sử dụng src trực tiếp
              width="100%" // Đặt chiều rộng 100% cho hình ảnh
              height={200} // Đặt chiều cao cố định
              className="object-cover w-full h-full" // Đảm bảo hình ảnh cắt tỉa đúng tỷ lệ và chiếm đầy chiều rộng
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsGallery;
