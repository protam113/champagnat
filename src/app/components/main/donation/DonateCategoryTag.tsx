'use client';

import React, { useState } from 'react';
import { DonateList } from '@/lib/donateList';
import { ClipLoader } from 'react-spinners';

const DonateTag = ({
  onFilterChange,
  setRefreshKey,
}: {
  onFilterChange: (categories: string[]) => void;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [currentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetching categories
  const { queueData, isLoading, isError } = DonateList(
    currentPage,
    'donate',
    0, // Sử dụng refreshKey tại đây
  );

  // Handle loading state or error (optional)
  if (isError) {
    console.error('Error fetching categories');
    return <div>Error fetching categories</div>;
  }

  if (isLoading)
    return (
      <div>
        <div className="text-center">
          <ClipLoader size="20" loading={isLoading} />
        </div>
      </div>
    );

  const handleCategoryChange = (categoryId: string) => {
    // If the selected category is clicked again, unselect it
    const newSelectedCategory =
      selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newSelectedCategory);

    // Trigger filter change with the selected category
    onFilterChange(newSelectedCategory ? [newSelectedCategory] : []);

    // If no category is selected, trigger a refresh
    if (!newSelectedCategory) {
      setRefreshKey((prev) => prev + 1);
    }
  };

  return (
    <div className="flex gap-2">
      {queueData?.map((category) => (
        <div
          key={category.id}
          color={selectedCategory === category.id ? '#142857' : ''}
          className={`text-16  py-2 px-4 rounded-lg cursor-pointer border border-[#142857] ${
            selectedCategory === category.id
              ? 'bg-primary-500 text-white'
              : 'bg-white text-[#142857]'
          } transition-all duration-300 ease-in-out hover:bg-[#142857] hover:text-white`}
          onClick={() => handleCategoryChange(category.id)}
        >
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default DonateTag;
