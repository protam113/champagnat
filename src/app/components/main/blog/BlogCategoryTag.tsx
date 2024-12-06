'use client';

import React, { useState } from 'react';
import { Flex, Tag } from 'antd';
import { CategoriesList } from '@/lib/categoriesList';

const BlogTag = ({
  onFilterChange,
  setRefreshKey,
}: {
  onFilterChange: (categories: string[]) => void;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [currentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetching categories
  const { queueData, isLoading, isError } = CategoriesList(
    currentPage,
    'blog',
    0, // Sử dụng refreshKey tại đây
  );

  // Handle loading state or error (optional)
  if (isError) {
    console.error('Error fetching categories');
    return <div>Error fetching categories</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
    <Flex gap="4px 0" wrap>
      {queueData?.map((category) => (
        <Tag
          key={category.id}
          color={selectedCategory === category.id ? 'blue' : ''}
          style={{
            color: selectedCategory === category.id ? 'white' : '#142857',
            backgroundColor:
              selectedCategory === category.id ? 'blue' : 'white',
            border: '1px solid #142857',
            fontSize: '16px',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
          onClick={() => handleCategoryChange(category.id)}
        >
          {category.name}
        </Tag>
      ))}
    </Flex>
  );
};

export default BlogTag;
