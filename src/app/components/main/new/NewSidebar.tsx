'use client';

import { CategoriesList } from '@/lib/categoriesList';
import React, { useState } from 'react';
import { FaExclamationTriangle, FaFolderOpen } from '@/lib/iconLib';

const NewSidebar = ({
  onFilterChange,
  setRefreshKey, // Nhận prop từ component cha
}: {
  onFilterChange: (categories: string[]) => void;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [currentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { queueData, isLoading, isError } = CategoriesList(
    currentPage,
    'news',
    0, // Sử dụng refreshKey tại đây
  );

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prevState) => {
      if (prevState.includes(categoryId)) {
        return prevState.filter((id) => id !== categoryId);
      } else {
        return [...prevState, categoryId];
      }
    });
  };

  const handleFilter = () => {
    onFilterChange(selectedCategories);

    // Nếu không có category được chọn, sẽ trigger refresh
    if (selectedCategories.length === 0) {
      setRefreshKey((prev) => prev + 1); // Gọi setRefreshKey để trigger refresh
    }
  };

  return (
    <div className="w-full lg:w-1/4 rounded-lg">
      <h3 className="text-16 font-semibold mb-4">Danh mục</h3>
      <div className="space-y-4">
        {/* Left Filter */}
        <div>
          <h4 className="font-bold mb-2">Thể loại</h4>
          <div className="space-y-3">
            {isLoading && (
              <p className="text-center text-gray-500">Đang tải danh mục...</p>
            )}
            {isError && (
              <div className="flex flex-col text-14 items-center text-red-500">
                <FaExclamationTriangle className=" mb-2" />
                <p>Có lỗi khi tải danh mục.</p>
              </div>
            )}
            {queueData && queueData.length > 0 ? (
              queueData.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition duration-300 ease-in-out"
                >
                  <input
                    type="checkbox"
                    value={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="h-5 w-5 border-2 border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{category.name}</span>
                </label>
              ))
            ) : (
              <p className="flex flex-col text-14 items-center text-gray-600">
                <FaFolderOpen className=" mb-2" />
                Không có danh mục nào.
              </p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleFilter}
            className="w-full p-2 bg-blue-500 text-white rounded"
          >
            Lọc
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSidebar;
