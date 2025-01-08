'use client';

import Contact from '@/components/design/formResgister';
import Heading from '@/components/design/Heading';
import MessagesCat from '@/components/main/message/category/messageCat';

const Page = () => {
  return (
    <main>
      <div className="mb-10 text-center">
        <Heading name="Thư Của Đấng Sáng Lập" />
        <p className="mt-2 text-gray-600">
          Cập nhật những tin tức mới nhất, đồng hành cùng nhịp sống của cộng
          đồng.
        </p>
      </div>

      <MessagesCat />

      <Contact />
    </main>
  );
};

export default Page;
