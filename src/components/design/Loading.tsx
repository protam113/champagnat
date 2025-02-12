// components/Loading.tsx
import React from 'react';
import Image from 'next/image';
import loading from '@/assets/image/image_logo.png';
const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="logo-container">
        <Image
          src={loading} // Đường dẫn ảnh
          alt="Logo"
          width={128} // Chiều rộng ảnh
          height={128} // Chiều cao ảnh
          className="logo"
        />
      </div>
    </div>
  );
};

export default Loading;
