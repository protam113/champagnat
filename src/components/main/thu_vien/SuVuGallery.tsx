import React from 'react';
import { Image } from 'antd';
import image1 from '@/assets/image/about.jpg';
import image2 from '@/assets/image/banner.png';
import image3 from '@/assets/image/banner.png';
import image4 from '@/assets/image/banner.png';
import image5 from '@/assets/image/banner.png';
import image6 from '@/assets/image/banner.png';
import image7 from '@/assets/image/banner.png';
import image8 from '@/assets/image/banner.png';
import image9 from '@/assets/image/banner.png';
import image10 from '@/assets/image/banner.png';

const SuVuGallery = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
  ];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3  pt-5">
        {images.map((src, index) => (
          <div key={index} className="relative w-full h-full">
            <Image
              alt={`Image ${index + 1}`}
              src={src.src} // Sử dụng src trực tiếp
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

export default SuVuGallery;
