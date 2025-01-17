'use client';

import BackButton from '@/components/button/BackButton';
import CategoryTag from '@/components/category/CategoryTag';
import Container from '@/components/Container/container';
import Contact from '@/components/design/formResgister';
import DocsCat from '@/components/main/document/category/DocCat';

const Page = () => {
  return (
    <Container>
      <BackButton path="/document" />
      <div className="mt-6 mb-4">
        <CategoryTag model="document" href="/document/category" />
      </div>
      <DocsCat />
      <Contact />
    </Container>
  );
};

export default Page;
