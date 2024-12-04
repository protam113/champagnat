"use client";

import RecentPosts from "@/app/components/main/new/RecentPosts";
import FeaturedPosts from "@/app/components/main/new/FeaturedPosts";
import Breadcrumb from "@/app/components/design/BreackCumb";
import Heading from "@/app/components/design/Heading";

const New = () => {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="mb-10 text-center">
        <Heading name="tin tức " />
        <Breadcrumb />
        <p className="mt-2 text-gray-600">
          Tin tức về những tin chi tiết, bài viết và cập nhật mới nhất
        </p>
      </div>
      <FeaturedPosts />
      <RecentPosts />
    </main>
  );
};

export default New;
