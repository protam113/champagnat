'use client';

import { useEffect, useState, memo } from 'react';
import Image from 'next/image';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; // Thêm style cho slideshow
import { FaArrowLeft, FaArrowRight, FaLongArrowAltRight } from 'react-icons/fa';
import { NewsList } from '@/lib/newList';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import formatDate from '@/utils/formatDate';
import logo from '@/assets/image/logo_default.png';
import Link from 'next/link';
// Dữ liệu cho phần tin tức

const Hero = () => {
  const [currentPage] = useState(1);
  const [refreshKey] = useState(0);
  const [slideItems, setSlideItems] = useState(4); // Số lượng bài mặc định trên mỗi slide

  // Lấy dữ liệu tin tức từ API
  const {
    queueData: newsData,
    isLoading,
    isError,
  } = NewsList(currentPage, '', refreshKey);

  const [isClient, setIsClient] = useState(false);

  // Chia dữ liệu tin tức thành các slide với số lượng bài tương ứng
  const slides = [];
  if (newsData) {
    for (let i = 0; i < newsData.length; i += slideItems) {
      slides.push(newsData.slice(i, i + slideItems));
    }
  }

  useEffect(() => {
    setIsClient(true); // Đảm bảo rằng code chỉ chạy trên client

    // Thay đổi số lượng bài trên mỗi slide khi kích thước cửa sổ thay đổi
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlideItems(1); // Mobile: 1 bài mỗi slide
      } else if (window.innerWidth <= 1024) {
        setSlideItems(2); // Tablet: 2 bài mỗi slide
      } else {
        setSlideItems(4); // Desktop: 4 bài mỗi slide
      }
    };

    // Lắng nghe sự thay đổi kích thước cửa sổ
    window.addEventListener('resize', handleResize);

    // Gọi hàm một lần để thiết lập giá trị ban đầu
    handleResize();

    // Dọn dẹp khi component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isClient) {
    return null;
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
          <Link href={`/news/${news.id}`} className="each-slide" key={index}>
            <div className="relative w-full h-[300px] lg:h-[450px]">
              <Image
                src={news.image || logo}
                alt={`Banner Image ${index + 1}`}
                className="object-cover"
                layout="fill"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Link>
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
                    className="bg-primary-800 p-2 lg:p-4 w-full sm:w-1/2 md:w-1/4"
                    key={newsIndex}
                  >
                    <p className="text-gray-300 text-xs font-bold">
                      <p>{formatDate(news.created_date)}</p>
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
                    <Link
                      href={`/news/${news.id}`}
                      className="relative flex items-center gap-1 text-primary-100 group"
                    >
                      <i>Tiếp tục đọc</i>{' '}
                      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-1/2"></span>
                      <FaLongArrowAltRight className="arrow-icon transform transition-transform duration-300 group-hover:translate-x-2" />
                    </Link>
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

export default memo(Hero);
