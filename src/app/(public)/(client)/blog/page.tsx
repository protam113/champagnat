'use client';

import Contact from '@/components/design/formResgister';
import Heading from '@/components/design/Heading';
import BlogContent from '@/components/main/blog/BlogContent';
import RecentBlogPosts from '@/components/main/blog/RecentBlogPosts';

const BlogPage = () => {
  return (
    <main>
      <div className="mb-10 text-center">
        <Heading name="bài viết" />
        <p className="mt-2 text-gray-600">
          Bài viết không chỉ để đọc, mà còn để cảm nhận và suy ngẫm.
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
