'use client';

import React, { useState } from 'react';
import { CategoriesList } from '@/lib/categoriesList';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import logo from '@/assets/image/logo_default.png';
interface Category {
  id: string;
  name: string;
  image: string; // Đường dẫn tới hình ảnh
}

const BlogTag = ({
  onFilterChange,
  setRefreshKey,
}: {
  onFilterChange: (categories: string[]) => void;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [currentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 768 }); // Kiểm tra nếu màn hình <= 768px

  // Fetching categories
  const { queueData, isLoading, isError } = CategoriesList(
    currentPage,
    'blog',
    0, // Sử dụng refreshKey tại đây
  );

  console.log(queueData);

  // Handle loading state or error (optional)
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

  const handleCategoryChange = (categoryId: string) => {
    const newSelectedCategory =
      selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newSelectedCategory);

    onFilterChange(newSelectedCategory ? [newSelectedCategory] : []);
    if (!newSelectedCategory) {
      setRefreshKey((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {queueData?.map((category: Category) => (
        <div
          key={category.id}
          className={`relative flex flex-col items-center justify-center cursor-pointer border border-primary-500 bg-primary-500  `}
          onClick={() => handleCategoryChange(category.id)}
        >
          {!isMobile && (category.image || logo) ? (
            <div className="w-52 h-32 relative overflow-hidden">
              <Image
                src={category.image || logo}
                alt={category.name}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 hover:scale-110"
              />
              <div
                className="absolute text-16 bottom-0 left-0 w-full text-white text-center p-2 rounded-b-md z-10"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)', // Nền mờ nhẹ
                  backdropFilter: 'blur(2px)', // Làm mờ phần nền phía sau
                  WebkitBackdropFilter: 'blur(2px)', // Hỗ trợ cho trình duyệt Webkit (Safari, iOS)
                }}
              >
                {category.name}
              </div>
            </div>
          ) : (
            <div className="text-center p-2">{category.name}</div> // Chỉ hiển thị tên
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogTag;
