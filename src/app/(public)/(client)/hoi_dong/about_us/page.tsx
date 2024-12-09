'use client';
// import { TextParallaxContentExample } from '@/app/components/animate/scroll/TextParallaxContent';
import Heading from '@/app/components/design/Heading';
import Image from 'next/image';
import React, { useState } from 'react';
import banner from '@/assets/image/banner-3.jpg';
import { HistoryMonasteryData } from '@/lib/historyMonasteryData';
import { ClipLoader } from 'react-spinners';
import Container from '@/app/components/Container/container';
import history from '@/assets/image/history.jpg';
const Page = () => {
  const [refreshKey] = useState(0); // State để làm mới dữ liệu

  const {
    queueData: data,
    isLoading,
    isError,
  } = HistoryMonasteryData(refreshKey);

  if (isLoading)
    return (
      <div className="text-center">
        <ClipLoader size="20" loading={isLoading} />
      </div>
    );
  if (isError || !data) return <div>Error loading queue data.</div>;
  return (
    <div>
      <Container>
        <div className="relative w-full h-96 mb-4">
          <Image src={banner} alt="banner" layout="fill" objectFit="cover" />
        </div>
        <Heading name="Giới Thiệu Về Hội Dòng" />
        <div className="flex items-center justify-between my-10">
          {/* Nội dung bên trái */}
          <div className="text-left w-1/2 pr-8">
            <div className="text-18 italic text-black">
              <b className="text-24">&#34;</b> Với niềm tin và lòng kiên trì,
              chúng ta cùng nhau xây dựng một cộng đồng vững mạnh, lan tỏa giá
              trị tốt đẹp và gắn kết những tâm hồn trong một hành trình chung
              đầy ý nghĩa. <b className="text-24"> &#34;</b>
            </div>
          </div>

          {/* Hình ảnh bên phải */}
          <div className="relative w-1/2 h-64">
            <Image
              src={history}
              alt="banner"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* <TextParallaxContentExample /> */}

        <p
          className="content"
          dangerouslySetInnerHTML={{
            __html: data.about.replace(/\"/g, ''), // Xóa tất cả dấu "
          }}
        />
      </Container>
    </div>
  );
};

export default Page;
