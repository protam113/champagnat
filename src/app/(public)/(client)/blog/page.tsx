'use client';

import Contact from '@/components/design/formResgister';
import Heading from '@/components/design/Heading';
import BlogContent from '@/components/main/blog/BlogContent';
import RecentBlogPosts from '@/components/main/blog/RecentBlogPosts';

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
