'use client';

import Contact from '@/components/design/formResgister';
import Heading from '@/components/design/Heading';
import DocContent from '@/components/main/document/DocContent';

const Doc = () => {
  return (
    <main>
      <div className="mb-10 text-center">
        <Heading name="Tài Liệu" />
        <p className="mt-2 text-gray-600">
          Tài liệu của hội dòng cung cấp thông tin về sứ mệnh và hoạt động của
          hội.
        </p>
      </div>
      <DocContent />
      <Contact />
    </main>
  );
};

export default Doc;
