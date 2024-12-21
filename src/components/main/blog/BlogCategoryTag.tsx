'use client';

import React, { useState } from 'react';
import { CategoriesList } from '@/lib/categoriesList';
import { ClipLoader } from 'react-spinners';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';
import logo from '@/assets/image/logo_default.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Category {
  id: string;
  name: string;
  image: string;
}

const BlogTag = ({
  onFilterChange,
  setRefreshKey,
}: {
  onFilterChange: (categories: string[]) => void;
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [currentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const { queueData, isLoading, isError } = CategoriesList(
    currentPage,
    'blog',
    0,
  );

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

  const handleCategoryChange = (categoryId: string) => {
    const newSelectedCategory =
      selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newSelectedCategory);

    onFilterChange(newSelectedCategory ? [newSelectedCategory] : []);
    if (!newSelectedCategory) {
      setRefreshKey((prev) => prev + 1);
    }
  };

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
        {/* <FaChevronRight className="text-primary-500 text-2xl" /> */}
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
        {/* <FaChevronLeft className="text-primary-500 text-2xl" /> */}
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 2 : 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {queueData?.map((category: Category) => (
          <div key={category.id} className="px-2">
            <div
              className={`relative flex flex-col items-center justify-center cursor-pointer border border-primary-500 bg-primary-500 hover:bg-primary-400 transition-all duration-300 rounded-lg overflow-hidden ${
                selectedCategory === category.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleCategoryChange(category.id)}
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
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      backdropFilter: 'blur(2px)',
                      WebkitBackdropFilter: 'blur(2px)',
                    }}
                  >
                    {category.name}
                  </div>
                </div>
              ) : (
                <div className="text-center text-14 p-4 text-white">
                  {category.name}
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BlogTag;
