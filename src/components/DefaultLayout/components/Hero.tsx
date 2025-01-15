'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; // Thêm style cho slideshow
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Các mũi tên điều hướng
import { NewsList } from '@/lib/newList';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import logo from '@/assets/image/logo_default.png';
import Link from 'next/link';
import Container from '@/components/Container/container';
import formatDate from '@/utils/formatDate';
const Hero = () => {
  const slideItems = 5; // Mỗi slide có 5 phần tử

  // Lấy dữ liệu tin tức từ API
  const { queueData: newsData, isLoading, isError } = NewsList(1, '', 0);

  // Chia dữ liệu tin tức thành các slide với số lượng bài tương ứng
  const slides = [];
  if (newsData) {
    // Kiểm tra và chỉ tạo slide khi có đủ số lượng bài viết (5, 10, 15, ...)
    for (let i = 0; i < newsData.length; i += slideItems) {
      const slide = newsData.slice(i, i + slideItems);
      if (slide.length === slideItems) {
        slides.push(slide); // Chỉ thêm slide khi có đủ 5 phần tử
      }
    }
  }

  // Hiển thị khi đang tải
  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Spin indicator={<LoadingOutlined spin />} />
      </div>
    );
  }

  // Hiển thị khi có lỗi
  if (isError) {
    return null;
  }

  // Kiểm tra nếu không có đủ slide
  if (slides.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-xl">Chưa có đủ bài viết để hiển thị slideshow</p>
      </div>
    );
  }

  return (
    <Container>
      <div className="relative">
        <Slide
          easing="ease"
          duration={4000}
          transitionDuration={500}
          arrows={true} // Đảm bảo mũi tên luôn hiển thị
          prevArrow={
            <div className="absolute left-4 top-1/2 transform translate-y-1/2 text-white bg-primary-500 bg-opacity-50 p-2 rounded-full hover:bg-albert-warning transition-all duration-300">
              <FaArrowLeft size={18} />
            </div>
          }
          nextArrow={
            <div className="absolute right-4 top-1/2 transform translate-y-1/2 text-white bg-primary-500 bg-opacity-50 p-2 rounded-full hover:bg-albert-warning transition-all duration-300">
              <FaArrowRight size={18} />
            </div>
          }
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="grid grid-cols-12 lg:grid-cols-12 gap-0.5"
            >
              {/* Dòng 1: 2 phần tử lớn */}
              <div className="col-span-12 lg:col-span-6">
                {slide[0] && (
                  <Link
                    href={`/news/${slide[0].id}`}
                    className="relative group"
                  >
                    <div className="relative w-full lg:h-[300px] h-[250px] group">
                      <Image
                        src={slide[0].image || logo}
                        alt={`Banner Image ${index + 1}`}
                        className="object-cover w-full h-full"
                        layout="fill"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 px-4 opacity-100">
                          <p className="text-white lg:text-14 text-12 transition-all duration-300 group-hover:translate-y-[-25px]">
                            {formatDate(slide[0].created_date)}
                          </p>
                          <h2 className="lg:text-20 text-14 font-bold text-white transition-all duration-300 group-hover:translate-y-[-20px]">
                            {slide[0].title}
                          </h2>
                          <p className="description text-white text-12 lg:text-16 py-1 opacity-50 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 transform translate-y-[50px] line-clamp-4">
                            {slide[0].description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              <div className="col-span-6 lg:col-span-6">
                {slide[1] && (
                  <Link
                    href={`/news/${slide[1].id}`}
                    className="relative group"
                  >
                    <div className="relative w-full lg:h-[300px] h-[200px] group">
                      <Image
                        src={slide[1].image || logo}
                        alt={`Banner Image ${index + 1}`}
                        className="object-cover w-full h-full"
                        layout="fill"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 px-4 opacity-100">
                          <p className="text-white lg:text-14 text-12 transition-all duration-300 group-hover:translate-y-[-25px]">
                            {formatDate(slide[1].created_date)}
                          </p>
                          <h2 className="lg:text-20 text-14 font-bold text-white transition-all duration-300 group-hover:translate-y-[-20px]">
                            {slide[1].title}
                          </h2>
                          <p className="description text-white text-12 lg:text-16 py-1 opacity-50 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 transform translate-y-[50px] line-clamp-4">
                            {slide[1].description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              {/* Dòng 2: 3 phần tử nhỏ */}
              <div className="col-span-6 lg:col-span-4">
                {slide[2] && (
                  <Link
                    href={`/news/${slide[2].id}`}
                    className="relative group"
                  >
                    <div className="relative w-full lg:h-[240px] h-[200px]">
                      <Image
                        src={slide[2].image || logo}
                        alt={`Banner Image ${index + 1}`}
                        className="object-cover w-full h-full"
                        layout="fill"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 px-4 opacity-100">
                          <p className="text-white lg:text-14 text-12 transition-all duration-300 group-hover:translate-y-[-25px]">
                            {formatDate(slide[2].created_date)}
                          </p>
                          <h2 className="lg:text-20 text-14 font-bold text-white transition-all duration-300 group-hover:translate-y-[-20px]">
                            {slide[2].title}
                          </h2>
                          <p className="description text-white text-12 lg:text-16 py-1 opacity-50 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 transform translate-y-[50px] line-clamp-4">
                            {slide[2].description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              <div className="col-span-6 lg:col-span-4">
                {slide[3] && (
                  <Link
                    href={`/news/${slide[3].id}`}
                    className="relative group"
                  >
                    <div className="relative w-full lg:h-[240px] h-[200px]">
                      <Image
                        src={slide[3].image || logo}
                        alt={`Banner Image ${index + 1}`}
                        className="object-cover w-full h-full"
                        layout="fill"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 px-4 opacity-100">
                          <p className="text-white lg:text-14 text-12 transition-all duration-300 group-hover:translate-y-[-25px]">
                            {formatDate(slide[3].created_date)}
                          </p>
                          <h2 className="lg:text-20 text-14 font-bold text-white transition-all duration-300 group-hover:translate-y-[-20px]">
                            {slide[3].title}
                          </h2>
                          <p className="description text-white text-12 lg:text-16 py-1 opacity-50 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 transform translate-y-[50px] line-clamp-4">
                            {slide[3].description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              <div className="col-span-6 lg:col-span-4">
                {slide[4] && (
                  <Link
                    href={`/news/${slide[4].id}`}
                    className="relative group"
                  >
                    <div className="relative w-full lg:h-[240px] h-[200px]">
                      <Image
                        src={slide[4].image || logo}
                        alt={`Banner Image ${index + 1}`}
                        className="object-cover w-full h-full"
                        layout="fill"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 px-4 opacity-100">
                          <p className="text-white lg:text-14 text-12 transition-all duration-300 group-hover:translate-y-[-25px]">
                            {formatDate(slide[4].created_date)}
                          </p>
                          <h2 className="lg:text-20 text-14 font-bold text-white transition-all duration-300 group-hover:translate-y-[-20px]">
                            {slide[4].title}
                          </h2>
                          <p className="description text-white text-12 lg:text-16 py-1 opacity-50 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 transform translate-y-[50px] line-clamp-4">
                            {slide[4].description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </Container>
  );
};

export default memo(Hero);
