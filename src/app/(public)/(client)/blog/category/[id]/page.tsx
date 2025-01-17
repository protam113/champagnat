'use client';

import BackButton from '@/components/button/BackButton';
import CategoryTag from '@/components/category/CategoryTag';
import Container from '@/components/Container/container';
import Contact from '@/components/design/formResgister';
import BlogsCat from '@/components/main/blog/category/blogCat';

const Page = () => {
  return (
    <Container>
      <BackButton path="/blog" />
      <div className="mt-6 mb-4">
        <CategoryTag model="blog" href="/blog/category" />
      </div>
      <BlogsCat />
      <Contact />
    </Container>
  );
};

export default Page;
