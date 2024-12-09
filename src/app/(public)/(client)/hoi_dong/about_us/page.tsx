// import { TextParallaxContentExample } from '@/app/components/animate/scroll/TextParallaxContent';
import Heading from '@/app/components/design/Heading';
import Image from 'next/image';
import React from 'react';
import banner from '@/assets/image/banner-3.jpg';

const Page = () => {
  return (
    <div>
      <div className="relative w-full h-96 mb-4">
        <Image src={banner} alt="banner" layout="fill" objectFit="cover" />
      </div>
      <Heading name="Giới Thiệu Về Hội Dòng" />
      <div className="text-center mt-3 text-16 italic text-gray-600 ">
        &#34;Với niềm tin và lòng kiên trì, chúng ta cùng nhau xây dựng một cộng
        đồng vững mạnh, <br />
        lan tỏa giá trị tốt đẹp và gắn kết những tâm hồn trong một hành trình
        chung đầy ý nghĩa.&#34;
      </div>

      {/* <TextParallaxContentExample /> */}
    </div>
  );
};

export default Page;
