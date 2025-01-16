'use client';

import React, { useState, useRef } from 'react';
import { HistoryMonasteryData } from '@/lib/historyMonasteryData';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextParallaxContentProps, OverlayCopyProps } from '@/types/types';
import LazyLoad from 'react-lazyload';

const History = ({ data }: { data: any }) => {
  return (
    <div>
      <div
        className="content text-base md:text-lg space-y-4"
        dangerouslySetInnerHTML={{
          __html: data.about.replace(/\"/g, ''),
        }}
      />
    </div>
  );
};

export const HistoryContent = ({ category }: { category: string }) => {
  const [refreshKey] = useState(0);
  const {
    queueData: data,
    isLoading,
    isError,
  } = HistoryMonasteryData(refreshKey, category);

  if (isLoading)
    return (
      <div className="text-center">
        <ClipLoader size="20" loading={isLoading} />
      </div>
    );
  if (isError || !data) return <div>Error loading queue data.{isError}</div>;

  return (
    <div className="w-full">
      <TextParallaxContent
        subheading=""
        heading={data.title}
        image={data.image}
      >
        <History data={data} />
      </TextParallaxContent>
    </div>
  );
};

const TextParallaxContent: React.FC<
  TextParallaxContentProps & { image: string }
> = ({ subheading, heading, children, image }) => {
  return (
    <div>
      <div className="relative ">
        {/* Giảm chiều cao trên mobile */}
        <StickyImage image={image} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      <div className="mt-4 md:mt-8">{children}</div>
    </div>
  );
};

const StickyImage: React.FC<{ image: string }> = ({ image }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <LazyLoad
      height={200} // Chiều cao tạm thời để tối ưu lazy load
      offset={100} // Offset kích hoạt Lazy Load trước khi cuộn tới
      debounce={200} // Tránh load quá sớm khi người dùng cuộn liên tục
      once // Chỉ load một lần
    >
      <motion.div
        ref={targetRef}
        style={{
          scale,
        }}
        className="sticky top-0 z-0 overflow-hidden rounded-xl md:rounded-3xl w-full h-[25vh] lg:h-screen"
      >
        <Image
          src={image}
          alt="Sticky image"
          fill
          className="object-cover"
          sizes="50vw"
          priority // Chỉ sử dụng priority
        />

        <motion.div
          className="absolute  bg-neutral-950/30"
          style={{
            opacity,
          }}
        />
      </motion.div>
    </LazyLoad>
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
      className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center text-white px-4 md:px-0"
    >
      <p className="mb-1 md:mb-4 text-center text-sm  lg:text-3xl font-bold text-shadow-lg">
        {subheading}
      </p>
      <h1 className="bg-gray-300/50 backdrop-blur-lg p-5 lg:max-w-4xl max-w-xs font-heading  text-center text-lg  lg:text-6xl opacity-100 leading-tight text-shadow-xl">
        {heading}
      </h1>
    </motion.div>
  );
};

export default TextParallaxContent;
