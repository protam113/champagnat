'use client';
import React, { useState } from 'react';
import { CategoriesList } from '@/lib/categoriesList';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import Slider, { Settings } from 'react-slick'; // Import Settings
import logo from '@/assets/image/logo_default.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  image: string;
}

const MessageTag = () => {
  const [currentPage] = useState(1);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { queueData, isLoading, isError } = CategoriesList(
    currentPage,
    'messageformfounder',
    0,
  );
  console.log(queueData);
  if (isError) {
    console.error('Error fetching categories');
    return <div>Error fetching categories</div>;
  }

  if (isLoading)
    return (
      <div className="text-center">
        <ClipLoader size="20" loading={isLoading} />
      </div>
    );

  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} cursor-pointer z-10`}
        style={{
          ...style,
          display: 'block',
          right: '10px',
        }}
        onClick={onClick}
      >
        <span>→</span>
      </div>
    );
  };

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} cursor-pointer z-10`}
        style={{ ...style, display: 'block', left: '10px' }}
        onClick={onClick}
      >
        <span>←</span>
      </div>
    );
  };

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: Math.min(queueData?.length || 0, isMobile ? 2 : 4),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    lazyLoad: 'ondemand',
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(queueData?.length || 0, 3),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(queueData?.length || 0, 2),
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-[600px] w-full">
      <Slider {...settings}>
        {queueData?.map((category: Category) => (
          <Link
            href={`/founder/letter_from_the_founder/category/${category.id}`}
            key={category.id}
            className=" pr-6"
          >
            <div
              className={`relative w-full cursor-pointer border border-primary-500 bg-primary-500 transition-all duration-300 rounded-lg overflow-hidden`}
            >
              {!isMobile && (category.image || logo) ? (
                <div className="w-full h-32 relative overflow-hidden">
                  <Image
                    src={category.image || logo}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                  <div
                    className="absolute bottom-0 left-0 w-full text-white text-center p-2 text-sm"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      backdropFilter: 'blur(2px)',
                      WebkitBackdropFilter: 'blur(2px)',
                    }}
                  >
                    {category.name}
                  </div>
                </div>
              ) : (
                <div className="text-center text-12 p-4 text-white">
                  {category.name}
                </div>
              )}
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default MessageTag;
