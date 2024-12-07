'use client';

import Newsletter from '@/app/components/main/blog/newletter';
import Heading from '@/app/components/design/Heading';
import Tittle from '@/app/components/design/Tittle';
import RecentBlogPosts from '@/app/components/main/blog/RecentBlogPosts';
import BlogContent from '@/app/components/main/blog/BlogContent';

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

      {/* Newsletter section */}
      <Newsletter />
    </main>
  );
};

export default BlogPage;
