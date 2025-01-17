'use client';

import BackButton from '@/components/button/BackButton';
import CategoryTag from '@/components/category/CategoryTag';
import Container from '@/components/Container/container';
import Contact from '@/components/design/formResgister';
import Heading from '@/components/design/Heading';
import NewsCat from '@/components/main/news/category/newCat';

const Page = () => {
  return (
    <Container>
      <BackButton path="/news" />

      <div className="mb-10 text-center">
        <Heading name="Tin Tức" />
        <p className="mt-2 text-gray-600">
          Cập nhật những tin tức mới nhất, đồng hành cùng nhịp sống của cộng
          đồng.
        </p>
      </div>
      <div className="mt-6 mb-4">
        <CategoryTag model="news" href="/news/category" />
      </div>
      <NewsCat />

      <Contact />
    </Container>
  );
};

export default Page;
