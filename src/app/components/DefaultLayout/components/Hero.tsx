'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; // Thêm style cho slideshow
import { FaArrowLeft, FaArrowRight, FaLongArrowAltRight } from 'react-icons/fa';
import { NewsList } from '@/lib/newList';

// Dữ liệu cho phần tin tức

const Hero = () => {
  const [currentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy dữ liệu tin tức từ API
  const {
    queueData: newsData,
    isLoading,
    isError,
  } = NewsList(currentPage, '', refreshKey);

  const [isClient, setIsClient] = useState(false);

  // Chia dữ liệu tin tức thành các slide với mỗi slide chứa 4 phần tử
  const slides = [];
  if (newsData) {
    for (let i = 0; i < newsData.length; i += 4) {
      slides.push(newsData.slice(i, i + 4));
    }
  }

  useEffect(() => {
    setIsClient(true); // Đảm bảo rằng code chỉ chạy trên client
  }, []);

  if (!isClient) {
    return null; // Không render component trên server
  }

  // Hiển thị khi đang tải
  if (isLoading) {
    return <div className="text-center">Đang tải dữ liệu...</div>;
  }

  // Hiển thị khi có lỗi
  if (isError) {
    return (
      <div className="text-center">
        Không thể tải dữ liệu. Vui lòng thử lại.
      </div>
    );
  }

  return (
    <div className="relative w-full h-4/5">
      <Slide
        easing="ease"
        autoplay={true}
        duration={4000}
        transitionDuration={500}
        arrows={false}
      >
        {newsData.map((news, index) => (
          <div className="each-slide" key={index}>
            <div className="relative w-full h-[400px]">
              {' '}
              {/* Chiều cao cố định là 400px */}
              <Image
                src={news.image || '/placeholder-image.jpg'} // Dùng hình ảnh thay thế nếu không có
                alt={`Banner Image ${index + 1}`}
                className="object-cover banner-image"
                fill // Sử dụng fill để lấp đầy container cha
                style={{ objectFit: 'cover' }} // Giữ tỉ lệ và cắt phần dư
              />
            </div>
          </div>
        ))}
      </Slide>

      {/* Phần tin tức */}
      <div className="relative cursor-pointer">
        <div
          className="rounded-lg w-full -bottom-10 md:w-3/4 absolute left-1/2 transform -translate-x-1/2 bg-primary-800 px-3"
          style={{
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)', // Điều chỉnh độ mờ và hướng của shadow
          }}
        >
          <Slide
            easing="ease"
            autoplay={true}
            duration={3000}
            transitionDuration={500}
            arrows={true}
            prevArrow={
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  fontSize: '14px',
                  color: 'white',
                }}
              >
                {<FaArrowLeft />}
              </div>
            }
            nextArrow={
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  fontSize: '14px',
                  color: 'white',
                }}
              >
                {<FaArrowRight />}
              </div>
            }
          >
            {slides.map((slide, index) => (
              <div className="flex flex-wrap justify-between px-4" key={index}>
                {slide.map((news, newsIndex) => (
                  <div
                    className="bg-primary-800 p-4 w-full sm:w-1/2 md:w-1/4"
                    key={newsIndex}
                  >
                    <p className="text-gray-300 text-xs font-bold">
                      <p>{news.created_date}</p>
                    </p>
                    <p className="w-max rounded-xl bg-primary-400 text-white text-xs mt-1 mb-3 py-1 px-3">
                      {news.categories
                        ?.map((category) => category.name)
                        .join(', ')}
                    </p>
                    <p
                      className="text-white text-sm font-bold truncate overflow-hidden"
                      style={{ maxHeight: '35px', lineHeight: '1.20em' }}
                    >
                      {news.title}
                    </p>
                    <hr className="border-t-1 border-white mt-2 mb-3" />
                    <div className="relative flex items-center gap-1 text-primary-100 group">
                      <i>Tiếp tục đọc</i>{' '}
                      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-1/2"></span>
                      <FaLongArrowAltRight className="arrow-icon" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default Hero;
