"use client";

import BlogGrid from "@/app/components/main/blog/blogProb";
import Newsletter from "@/app/components/main/blog/newletter";
import Heading from "@/app/components/design/Heading";
import Breadcrumb from "@/app/components/design/BreackCumb";

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

      {/* Blog grid and pagination */}
      <BlogGrid />

      {/* Newsletter section */}
      <Newsletter />
    </main>
  );
};

export default BlogPage;
