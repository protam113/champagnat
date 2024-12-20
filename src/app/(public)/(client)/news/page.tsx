'use client';

import Contact from '@/components/design/formResgister';
import Heading from '@/components/design/Heading';
import NewContent from '@/components/main/news/NewContent';
import RecentNewPosts from '@/components/main/news/RecentNewPosts';

const New = () => {
  return (
    <main>
      <div className="mb-10 text-center">
        <Heading name="Tin Tức" />
        <p className="mt-2 text-gray-600">
          Khám phá những tin tức chi tiết và cập nhật mới nhất
        </p>
      </div>

      <div className="mt-6">
        <RecentNewPosts />
      </div>

      <NewContent />

      <Contact />
    </main>
  );
};

export default New;
