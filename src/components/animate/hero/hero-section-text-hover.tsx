import React from 'react';
import dynamic from 'next/dynamic'; // Import dynamic for client-side rendering
import {
  FaChurch,
  PiHandsPrayingBold,
  FaCross,
  GiIronCross,
  AiFillHeart,
} from '@/lib/iconLib';

// Dynamically import the Map icon to avoid SSR issues
const MapIcon = dynamic(() => import('lucide-react').then((mod) => mod.Map), {
  ssr: false,
});

import { cn } from '@/lib/utils';

interface ItemProps {
  icon: React.ReactNode; // Updated to accept React node for icon components
  position: string;
}

interface HeroCardProps {
  destinations?: ItemProps[];
  treasures?: ItemProps[];
  className?: string;
}

const HeroSectionTextHover: React.FC<HeroCardProps> = ({ className }) => {
  const destinations: ItemProps[] = [
    {
      icon: <FaChurch />, // Using the FaChurch icon
      position:
        '-left-18 top-3 text-zinc-700 group-hover:-rotate-[10deg] group-hover:-translate-y-12 md:-left-28 md:-top-2 sm:-left-24',
    },
    {
      icon: <PiHandsPrayingBold />, // Using the PiHandsPrayingBold icon
      position:
        '-left-[72px] top-0 text-primary-700 group-hover:-rotate-[20deg] group-hover:-translate-x-10 md:-left-[135px] md:-top-2 sm:-left-24 ',
    },
    {
      icon: <FaCross />, // Using the FaCross icon
      position:
        'left-[50px] top-0 text-albert-warning group-hover:rotate-[10deg] group-hover:-translate-y-10 md:left-[210px] md:-top-1 sm:left-[180px]',
    },
    {
      icon: <GiIronCross />, // Using the GiIronCross icon
      position:
        'left-[200px] top-4 text-albert-noti group-hover:rotate-[20deg] group-hover:translate-x-16 md:left-[190px] md:-top-2 sm:left-[150px]',
    },
  ];

  const treasures: ItemProps[] = [
    {
      icon: <AiFillHeart />, // Using the AiFillHeart icon
      position:
        '-left-[100px] -top-7 -rotate-[30deg] group-hover:-translate-y-8 md:-left-40 md:-top-16 sm:-left-32',
    },
    {
      icon: <AiFillHeart />, // Example icon, you can choose others
      position:
        '-left-[115px] -top-2 group-hover:-rotate-45 md:-left-44 md:-top-1 sm:-left-36',
    },
    {
      icon: <AiFillHeart />, // Example icon, you can choose others
      position:
        'left-32 -top-12 rotate-[30deg] md:left-[200px] md:-top-[70px] sm:left-[175px] sm:-top-12',
    },
    {
      icon: <AiFillHeart />, // Example icon, you can choose others
      position:
        'left-32 -top-2 group-hover:rotate-[45deg] md:left-[200px] md:-top-1 sm:left-[160px] ',
    },
  ];

  return (
    <div
      className={cn(
        'storybook-fix py-12å relative min-h-[100px] w-full rounded-2xl border border-gray-200 md:min-h-[200px]',
        className,
      )}
    >
      <div className="mb-2 flex flex-col items-center justify-center gap-3">
        <div className="text-normal flex flex-col items-center justify-center p-5 font-bold sm:text-xl md:text-2xl">
          <div className="mt-5">
            {/* Sử dụng biểu tượng bản đồ được nhập động */}
            <MapIcon size={40} className="fill-zinc-900 text-white" />
          </div>
          <div className="flex items-center justify-center gap-1">
            <span className="text-gray-400">Khám phá</span>
            <div className="group relative flex items-center">
              <span className="text-zinc-500 group-hover:text-sky-400">
                Những Hành Trình Chưa Từng Biết
              </span>
              <div className="duration-400 absolute inset-0 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100">
                {destinations.map((dest, index) => (
                  <span
                    key={index}
                    className={cn(
                      'pointer-events-none absolute transform text-lg transition-transform duration-500 group-hover:scale-110 sm:text-2xl md:text-4xl',
                      dest.position,
                    )}
                  >
                    {dest.icon}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1">
            <span className="text-gray-400">và</span>
            <div className="group relative flex items-center">
              <span className="text-zinc-500 group-hover:text-orange-500">
                Trải Nghiệm Niềm Tin Sống Động
              </span>
              <div className="duration-400 absolute inset-0 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100">
                {treasures.map((gem, index) => (
                  <span
                    key={index}
                    className={cn(
                      'pointer-events-none absolute transform text-lg transition-transform duration-500 group-hover:scale-110 sm:text-2xl md:text-4xl',
                      gem.position,
                    )}
                  >
                    {gem.icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button className="cursor-pointer rounded-3xl bg-orange-400 px-4 py-2 font-mono tracking-tighter hover:bg-orange-500">
          Bắt đầu hành trình của bạn
        </button>
      </div>
    </div>
  );
};

export default HeroSectionTextHover;
