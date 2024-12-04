// src/components/LatestPosts.jsx
'use client';
import React, { useState } from 'react';
import Container from '../../Container/container';
import Tittle from '../../design/Tittle';
import NewSidebar from './NewSidebar';
import NewsProb from './newsProb';

const RecentLayout = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Cập nhật các thể loại được chọn
  const handleFilterChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  return (
    <Container>
      <div className="pt-20">
        <Tittle name="TIN TỨC MỚI NHẤT" />
        {/* Đường ngăn cách */}
        <div className="flex flex-col lg:flex-row gap-8 pt-10">
          {/* Left side: Filter section */}
          <NewSidebar
            onFilterChange={handleFilterChange}
            setRefreshKey={setRefreshKey} // Truyền setRefreshKey vào NewSidebar
          />

          {/* Right side: Main content area */}
          <NewsProb
            selectedCategories={selectedCategories}
            refreshKey={refreshKey}
          />
        </div>
      </div>
    </Container>
  );
};

export default RecentLayout;
