'use client';

import RecentNewPosts from '@/app/components/main/news/RecentNewPosts';
import Heading from '@/app/components/design/Heading';
import NewContent from '@/app/components/main/news/NewContent';
import Contact from '@/app/components/design/formResgister';

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
