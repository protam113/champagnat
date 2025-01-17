'use client';
import { HistoryContent } from '@/components/animate/scroll/TextParallaxContent';

import Container from '@/components/Container/container';
import VocationForm from '@/components/design/VocationForm';

const Page = () => {
  return (
    <Container>
      <div className=" py-10">
        <HistoryContent category="3b164b58-18c6-454b-bfec-3e345f8fe33f" />
      </div>
      <VocationForm />
    </Container>
  );
};

export default Page;
