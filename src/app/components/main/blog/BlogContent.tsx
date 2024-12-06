'use client';

import { useState } from 'react';
import { BlogList } from '@/lib/blogList';
import BlogProb from '@/app/components/main/blog/blogProb';
import Tittle from '@/app/components/design/Tittle';
import formatDate from '@/ultis/formatDate';
import BlogTag from '@/app/components/main/blog/BlogCategoryTag';

const BlogContent = () => {
  const [currentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryQuery = selectedCategory ? selectedCategory : '';

  // Lấy danh sách tin tức từ API
  const {
    queueData: blogs,
    isLoading,
    isError,
  } = BlogList(currentPage, categoryQuery, refreshKey);

  // Kiểm tra dữ liệu
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading news...</p>;

  // Cập nhật thể loại được chọn
  const handleFilterChange = (categories: string[]) => {
    // Update the selected category, should only have 1 or none
    setSelectedCategory(categories[0] || null);
  };

  return (
    <main>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tittle name="TẤT CẢ BÀI VIẾT" />
        <div className="mt-4 mb-4">
          <BlogTag
            onFilterChange={handleFilterChange}
            setRefreshKey={setRefreshKey}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <BlogProb
              key={index}
              id={blog.id}
              title={blog.title}
              description={blog.description}
              date={formatDate(blog.created_date)}
              author={blog.user.username}
              categories={blog.categories.map((category) => category.name)}
              image={blog.image}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogContent;
