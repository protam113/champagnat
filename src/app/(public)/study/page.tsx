'use client';

import { useState } from 'react';
import { IoFilter } from 'react-icons/io5';
import StudyContent from '@/components/main/study/StudyProb';
import FilterSidebar from '@/components/main/study/studySlider';

const StudyLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTagChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsSidebarOpen(false);
  };

  const handleResetFilter = () => {
    setSelectedCategory('');
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-max">
      {/* Header với nút filter */}
      <div>
        <div className=" px-4 py-3 flex items-center justify-between">
          <h1 className="text-24 font-bold text-gray-800">Thư Viện Tài Liệu</h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <IoFilter />
            Danh Mục
          </button>
        </div>
      </div>

      <div>
        <div className="flex gap-6">
          {/* Filter Sidebar - Luôn hiển thị trên desktop, modal trên mobile */}
          <FilterSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onTagChange={handleTagChange}
            onResetFilter={handleResetFilter}
            selectedCategory={selectedCategory}
          />

          {/* Main Content */}
          <StudyContent refreshKey={refreshKey} category={selectedCategory} />
        </div>
      </div>
    </div>
  );
};

export default StudyLayout;
