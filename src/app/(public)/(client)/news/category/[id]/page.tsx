'use client';

import Contact from '@/components/design/formResgister';
import Heading from '@/components/design/Heading';
import NewsCat from '@/components/main/news/category/newCat';

const Page = () => {
  return (
    <main>
      <div className="mb-10 text-center">
        <Heading name="Tin Tức" />
        <p className="mt-2 text-gray-600">
          Cập nhật những tin tức mới nhất, đồng hành cùng nhịp sống của cộng
          đồng.
        </p>
      </div>

      <NewsCat />

      <Contact />
    </main>
  );
};

export default Page;
