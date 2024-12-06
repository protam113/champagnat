'use client';

import Newsletter from '@/app/components/main/blog/newletter';
import Heading from '@/app/components/design/Heading';
import Breadcrumb from '@/app/components/design/BreackCumb';
import Tittle from '@/app/components/design/Tittle';
import RecentBlogPosts from '@/app/components/main/blog/RecentBlogPosts';
import BlogContent from '@/app/components/main/blog/BlogContent';

const BlogPage = () => {
  return (
    <main>
      <div className="mb-10 text-center">
        <Heading name="bài viết blog" />
        <Breadcrumb />
        <p className="mt-2 text-gray-600">
          Khám phá những thông tin chi tiết, bài viết và cập nhật mới nhất
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Tittle name="BÀI VIẾT GẦN ĐÂY" />
        <div className="mt-4">
          <RecentBlogPosts />
        </div>
      </div>
      <BlogContent />

      {/* Newsletter section */}
      <Newsletter />
    </main>
  );
};

export default BlogPage;
