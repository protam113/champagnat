'use client';

import Heading from '@/app/components/design/Heading';
import RecentBlogPosts from '@/app/components/main/blog/RecentBlogPosts';
import BlogContent from '@/app/components/main/blog/BlogContent';
import Contact from '@/app/components/design/formResgister';

const BlogPage = () => {
  return (
    <main>
      <div className="mb-10 text-center">
        <Heading name="bài viết blog" />
        <p className="mt-2 text-gray-600">
          Khám phá những thông tin chi tiết, bài viết và cập nhật mới nhất
        </p>
      </div>

      <div className="mt-6">
        <RecentBlogPosts />
      </div>

      <BlogContent />

      <Contact />
    </main>
  );
};

export default BlogPage;
