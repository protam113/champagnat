import { useRouter } from 'next/navigation';
import React from 'react';
import { IoIosArrowBack } from '@/lib/iconLib';

interface BackButtonProps {
  path?: string; // `path` là chuỗi, có thể là undefined nếu không truyền
}

const BackButton: React.FC<BackButtonProps> = ({ path }) => {
  const router = useRouter();

  const handleBack = () => {
    if (path) {
      router.push(path); // Điều hướng đến đường dẫn được truyền vào
    } else {
      router.back(); // Điều hướng quay lại trang trước đó
    }
  };

  return (
    <div
      onClick={handleBack}
      className="relative flex items-center justify-center cursor-pointer w-[145px] h-[30px] text-primary-500 text-16 font-semibold group transition-all duration-500 ease-in-out overflow-hidden"
    >
      {/* Thanh dọc bên trái */}
      <span className="absolute left-0 top-0 h-full w-1 bg-primary-500"></span>

      {/* Mũi tên */}
      <IoIosArrowBack className="relative z-10  transition-transform duration-500 group-hover:-translate-x-1 ease-in-out group-hover:text-white" />

      {/* Văn bản */}
      <span className="relative z-10  transition-all duration-500 ease-in-out group-hover:text-white">
        Quay Lại
      </span>

      {/* Hiệu ứng hover */}
      <span className="absolute inset-0 bg-albert-warning scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span>
    </div>
  );
};

export default BackButton;
