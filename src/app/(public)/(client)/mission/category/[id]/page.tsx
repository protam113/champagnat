'use client';

import BackButton from '@/components/button/BackButton';
import CategoryTag from '@/components/category/CategoryTag';
import Container from '@/components/Container/container';
import Contact from '@/components/design/formResgister';
import Heading from '@/components/design/Heading';
import SuVuCat from '@/components/main/mission/category/suvuCat';

const Page = () => {
  return (
    <Container>
      <BackButton path="/mission" />

      <div className="mb-10 text-center">
        <Heading name="Sứ Vụ" />
        <p className="mt-2 text-gray-600">
          Cập nhật những tin tức mới nhất, đồng hành cùng nhịp sống của cộng
          đồng.
        </p>
      </div>
      <div className="mt-6 mb-4">
        <CategoryTag model="mission" href="/mission/category" />
      </div>
      <SuVuCat />

      <Contact />
    </Container>
  );
};

export default Page;
