'use client';

import React, { useState, useRef } from 'react';
import { HistoryMonasteryData } from '@/lib/historyMonasteryData';
import { ClipLoader } from 'react-spinners';
import history from '@/assets/image/about.jpg';
import about from '@/assets/image/about-2.jpg';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextParallaxContentProps, OverlayCopyProps } from '@/types/types';
import Container from '@/components/Container/container';
import Heading from '@/components/design/Heading';

const History = () => {
  const [refreshKey] = useState(0);

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
        <Heading name="Giới Thiệu Về Hội Dòng" />
        <div className="flex flex-col md:flex-row items-center justify-between my-6 md:my-10 gap-6 md:gap-0">
          {/* Nội dung bên trái */}
          <div className="text-left w-full md:w-1/2 pr-0 md:pr-8">
            <div className="text-lg md:text-2xl lg:text-28 italic text-black font-bold text-center md:text-left">
              <b className="text-lg md:text-2xl lg:text-28">&#34; </b>
              Đến với Chúa Giê-su nhờ Mẹ Maria.
              <br />
              Đến với Mẹ Maria vì Chúa Giê-su.
              <b className="text-lg md:text-2xl lg:text-24">&#34;</b>
            </div>
          </div>

          {/* Hình ảnh bên phải */}
          <div className="relative w-full md:w-1/2 h-48 md:h-64">
            <Image
              src={about}
              alt="banner"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div
          className="content text-base md:text-lg space-y-4"
          dangerouslySetInnerHTML={{
            __html: data.about.replace(/\"/g, ''),
          }}
        />
      </Container>
    </div>
  );
};

export const HistoryContent = () => {
  return (
    <div className="w-full">
      <TextParallaxContent
        subheading="Về Chúng Tôi"
        heading="Đôi Nét Về Hội Dòng Anh Em Đức Maria"
      >
        <History />
      </TextParallaxContent>
    </div>
  );
};

const TextParallaxContent: React.FC<TextParallaxContentProps> = ({
  subheading,
  heading,
  children,
}) => {
  return (
    <div className="px-4 md:px-12">
      <div className="relative h-[40vh] md:h-[150vh]">
        {' '}
        {/* Giảm chiều cao trên mobile */}
        <StickyImage />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      <div className="mt-4 md:mt-8">{children}</div>
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
      className="sticky top-0 z-0 overflow-hidden rounded-xl md:rounded-3xl w-full h-[25vh] md:h-full" // Giảm chiều cao hình trên mobile
    >
      <Image
        src={history}
        alt="Sticky image"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
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

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-[40vh] md:h-screen w-full flex-col items-center justify-center text-white px-4 md:px-0"
    >
      <p className="mb-1 md:mb-4 text-center text-sm md:text-xl lg:text-3xl font-bold text-shadow-lg">
        {subheading}
      </p>
      <h1 className="text-center text-lg md:text-4xl lg:text-7xl font-extrabold opacity-100 px-4 leading-tight text-shadow-xl">
        {heading}
      </h1>
    </motion.div>
  );
};

export default TextParallaxContent;
