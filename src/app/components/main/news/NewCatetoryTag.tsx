'use client';

import React, { useState } from 'react';
import { CategoriesList } from '@/lib/categoriesList';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

interface Category {
  id: string;
  name: string;
  image: string; // Đường dẫn tới hình ảnh
}

const NewsTag = ({
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
    'news',
    0, // Sử dụng refreshKey tại đây
  );

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
          className={`relative flex flex-col items-center justify-center cursor-pointer border border-[#142857] transition-all duration-300 ease-in-out hover:bg-[#142857] hover:text-white hover:scale-105`}
          onClick={() => handleCategoryChange(category.id)}
        >
          {!isMobile && category.image ? (
            <div className="w-60 h-40 relative overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 hover:scale-110"
              />
              <div
                className="absolute text-16 bottom-0 left-0 w-full text-white text-center p-2 rounded-b-lg z-10 transition-colors duration-300"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  backdropFilter: 'blur(2px)',
                  WebkitBackdropFilter: 'blur(2px)',
                }}
              >
                {category.name}
              </div>
            </div>
          ) : (
            <div className="text-center text-primary-500 p-2">
              {category.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NewsTag;
