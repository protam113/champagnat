'use client';

import { useEffect, useState, memo, useMemo } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; // Thêm style cho slideshow
import { FaArrowLeft, FaArrowRight, FaLongArrowAltRight } from 'react-icons/fa';
import { NewsList } from '@/lib/newList';
import formatDate from '@/utils/formatDate';
import Link from 'next/link';
import NewSekelton from '@/components/design/NewSekelton';
import { NotiPostError } from '@/components/design/index';
import { MoonLoader } from 'react-spinners';
import Image from 'next/image';
import { useBannerList } from '@/hooks/banner/useBanner';
// Dữ liệu cho phần tin tức

// const HeroBanner = [
//   {
//     id: 1,
//     url: 'https://res.cloudinary.com/ddw50zstg/image/upload/v1737003238/BeaconOfHope_banner_cirl6h.jpg',
//   },
//   {
//     id: 2,
//     url: 'https://res.cloudinary.com/ddw50zstg/image/upload/v1737003233/InTheFootsteps_banner-scaled_cdn648.jpg',
//   },
//   {
//     id: 3,
//     url: 'https://res.cloudinary.com/ddw50zstg/image/upload/v1737003233/MarcellinoEN_uf1f2y.jpg',
//   },
//   {
//     id: 4,
//     url: 'https://res.cloudinary.com/ddw50zstg/image/upload/v1737003232/Banner_Web_standup_epgoce.jpg',
//   },
//   {
//     id: 5,
//     url: 'https://res.cloudinary.com/ddw50zstg/image/upload/v1737003232/ChampagnatGlobalBanner_EN_nxhobl.jpg',
//   },
//   {
//     id: 6,
//     url: 'https://res.cloudinary.com/ddw50zstg/image/upload/v1737003232/Capitulo_2025_Banner_EN-scaled_mpockm.jpg',
//   },
//   {
//     id: 7,
//     url: 'https://res.cloudinary.com/ddw50zstg/image/upload/v1737003232/OtherMaristVoices_banner_tulbs1.jpg',
//   },
//   {
//     id: 8,
//     url: 'https://res.cloudinary.com/ddw50zstg/image/upload/v1737003231/BannerHomeRIP_luisCarlos-1-scaled_cypr4q.jpg',
//   },
// ];

const NewHero = () => {
  const [currentPage] = useState(1);
  const [refreshKey] = useState(0);
  const [slideItems, setSlideItems] = useState(4); // Số lượng bài mặc định trên mỗi slide

  // Lấy dữ liệu tin tức từ API
  const {
    queueData: newsData,
    isLoading,
    isError,
  } = NewsList(currentPage, '', refreshKey);
  const dataSource = useMemo(() => newsData, [newsData]);

  const [isClient, setIsClient] = useState(false);

  // Chia dữ liệu tin tức thành các slide với số lượng bài tương ứng
  const slides = [];
  if (dataSource) {
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
    return <NewSekelton />;
  }

  // Hiển thị khi có lỗi
  if (isError) {
    return null;
  }
  return (
    <div className="relative cursor-pointer">
      <div
        className="rounded-lg -bottom-10 w-3/4 absolute left-1/2 transform -translate-x-1/2 bg-primary-800 px-3"
        style={{
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)', // Điều chỉnh độ mờ và hướng của shadow
        }}
      >
        <Slide
          easing="ease"
          autoplay={true}
          duration={4000}
          transitionDuration={1000}
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
  );
};

interface Banner {
  id: string;
  image: string;
  visibility: string;
}

const Hero = () => {
  // Đảm bảo truyền đủ 3 tham số vào useBannerList
  const [refreshKey] = useState(0); // State để refresh dữ liệu
  const [visibility] = useState<string>('show'); // Default value of "show"
  const filters = visibility.trim() === '' ? {} : { visibility };

  // Dữ liệu banner từ hook useBannerList
  const { data, isLoading, isError } = useBannerList(filters, refreshKey);

  // Kiểm tra nếu data là mảng, nếu không thì set là mảng rỗng
  const queueData: Banner[] = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <div className="flex pt-10 items-center justify-center">
        <MoonLoader size={18} />
      </div>
    );
  }

  if (isError) {
    return <NotiPostError />;
  }

  return (
    <div className="relative w-full h-4/5">
      <Slide
        easing="ease"
        autoplay={true}
        duration={3000}
        transitionDuration={1000}
        prevArrow={
          <div
            style={{
              zIndex: '-10px',
              width: '20px',
              height: '20px',
              fontSize: '14px',
              color: 'white',
            }}
          >
            <FaArrowLeft />
          </div>
        }
        nextArrow={
          <div
            style={{
              zIndex: '-10px',
              width: '20px',
              height: '20px',
              fontSize: '14px',
              color: 'white',
            }}
          >
            <FaArrowRight />
          </div>
        }
      >
        {queueData.map((banner) => (
          <div key={banner.id} className="each-slide brightness-75">
            <div className="relative w-full h-[250px] lg:h-[400px]">
              <Image
                src={banner.image}
                alt={`Banner Image ${banner.id}`}
                className="object-cover w-full h-full"
                layout="fill"
              />
            </div>
          </div>
        ))}
      </Slide>

      {/* Phần tin tức */}
      <NewHero />
    </div>
  );
};

export default memo(Hero);
