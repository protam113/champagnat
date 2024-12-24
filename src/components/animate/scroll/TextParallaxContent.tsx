'use client';
// import { TextParallaxContentExample } from '@/app/components/animate/scroll/TextParallaxContent';
import React, { useState, useRef } from 'react';
import { HistoryMonasteryData } from '@/lib/historyMonasteryData';
import { ClipLoader } from 'react-spinners';
import history from '@/assets/image/about.jpg';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextParallaxContentProps, OverlayCopyProps } from '@/types/types';
import Container from '@/components/Container/container';
import Heading from '@/components/design/Heading';

const History = () => {
  const [refreshKey] = useState(0); // State để làm mới dữ liệu

  const {
    queueData: data,
    isLoading,
    isError,
  } = HistoryMonasteryData(refreshKey);
  console.log('🚀 ~ History ~ data:', data);

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
        <Heading name="Giới Thiệu Về Hội Dòng" />
        <div className="flex items-center justify-between my-10">
          {/* Nội dung bên trái */}
          <div className="text-left w-1/2 pr-8">
            <div className="text-28 italic text-black font-bold">
              <b className="text-28">&#34;</b> Đến với Chúa Giê-su nhờ Mẹ Maria.
              <br />
              Đến với Mẹ Maria vì Chúa Giê-su. <b className="text-24"> &#34;</b>
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

export const HistoryContent = () => {
  return (
    <div className="">
      <TextParallaxContent
        subheading="Về Chúng Tôi"
        heading="Đôi Nét Về Hội Dòng Anh Em Đức Maria"
      >
        <History />
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent: React.FC<TextParallaxContentProps> = ({
  subheading,
  heading,
  children,
}) => {
  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }}>
      <div className="relative h-[150vh]">
        <StickyImage />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {/* Đảm bảo children được render ở đây */}
      <div className="mt-8">{children}</div>
    </div>
  );
};

const StickyImage: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      ref={targetRef}
      style={{
        scale,
      }}
      className="sticky z-0 overflow-hidden rounded-3xl w-full h-full" // Đảm bảo có "relative" và kích thước
    >
      <Image src={history} alt="Sticky image" fill className="object-cover" />
      <motion.div
        className="absolute inset-0 bg-neutral-950/30"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy: React.FC<OverlayCopyProps> = ({ subheading, heading }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

export default function Title({ name }: { name: string }) {
  return (
    <h1 className="col-span-1 text-3xl font-bold md:col-span-4">{name}</h1>
  );
}
