// src/components/Footer.tsx
import LogoFooter from '@/assets/image/logo.svg';
import Image from 'next/image';
import Head from 'next/head';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from '@/lib/iconLib';
import Container from '@/components/Container/container';
const followUs = [
  { name: 'Đặc Sủng - Linh Đạo', link: '/hoi_dong/dac_sung-linh_dao' },
  { name: 'Lược Sử Hội Dòng', link: '/hoi_dong/about_us' },
  { name: 'Tìm Hiểu Ơn Gọi', link: '/on_goi/tim_hieu_on_goi' },
  { name: 'Các Giai Đoạn Đào Tạo', link: '/on_goi/cac_giai_doan_dao_tao' },
];

const dslUs = [
  { name: 'Cuộc đời Đấng Sáng Lập', link: '/founder/the_founder_life' },
  { name: 'Thư của Đấng Sáng Lập', link: '/founder/letter_from_the_founder' },
];

const legal = [
  { name: 'Tin Tức', link: '/news' },
  { name: 'Giáo Hội', link: '/blog' },
  { name: 'Sứ Vụ', link: '/mission' },
  { name: 'Tư Liệu', link: '/document' },
];

const baxh = [
  { name: 'Dự Án', link: '/projects' },
  { name: 'Quyên Góp', link: '/donation' },
];

const media = [
  { name: 'Ảnh', link: '/thu_vien/thu_vien_anh' },
  { name: 'Video', link: '/thu_vien/thu_vien_anh/thu_vien_video' },
];

const Footer = () => {
  return (
    <>
      <Head>
        {/* Preconnect và DNS Prefetch cho các tên miền bên ngoài */}
        <link rel="preconnect" href="https://hcm03.vstorage.vngcloud.vn" />
        <link rel="dns-prefetch" href="https://hcm03.vstorage.vngcloud.vn" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />
      </Head>

      <footer className="bg-primary-500 mt-20">
        <Container>
          <div className=" w-full  relative">
            <div className="grid grid-cols-1  lg:grid-cols-6 gap-4 py-8">
              <div className=" lg:col-span-2">
                <h2 className="mb-2 text-14 font-semibold text-white uppercase">
                  Bản Đồ
                </h2>
                <div className="relative pt-52 ">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d332.662125043758!2d106.45101828260943!3d10.990855226120695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310b2d60e4c833bd%3A0xfbe630fea0a95d8a!2sMARIST%20BROTHERS%20COMMUNITY!5e1!3m2!1sen!2s!4v1734406653011!5m2!1sen!2s"
                    className="absolute top-0 left-0 w-full h-full rounded-lg border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps"
                  ></iframe>
                </div>
              </div>
              {/* Phần Liên Hệ và Logo */}
              <div className="text-left text-14">
                <div className="pb-5">
                  <Image src={LogoFooter} alt="logo" className="h-24 w-auto" />
                </div>
                <div className="text-white pb-2 flex items-center">
                  <FaPhoneAlt className="mr-2" />
                  <span>0384543634 - 0345817993</span>
                </div>
                <div className="text-white pb-2 flex items-center">
                  <FaEnvelope className="mr-2" />
                  <a
                    href="mailto:maristvietnam@gmail.com"
                    className="hover:underline"
                  >
                    maristvietnam@gmail.com
                  </a>
                </div>
                <div className="text-white pb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>
                    3 Đ. Nguyễn Thị Nị, Phước Hiệp, Củ Chi, Hồ Chí Minh, Vietnam
                  </span>
                </div>
              </div>

              {/* Phần Bản Đồ */}

              {/* Phần Về Chúng Tôi */}
              <div className="lg:text-right text-center  text-14">
                <div>
                  <h2 className="mb-4  font-semibold text-white uppercase">
                    Về Chúng Tôi
                  </h2>
                  <ul className="space-y-2">
                    {followUs.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.link}
                          className="text-white hover:underline"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-5">
                  <h2 className="mb-4  font-semibold text-white uppercase">
                    Đấng Sáng Lập Dòng
                  </h2>
                  <ul className="space-y-2">
                    {dslUs.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.link}
                          className="text-white hover:underline"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Phần Danh Mục */}
              <div className="lg:text-right text-center text-14">
                <h2 className="mb-4 font-semibold text-white uppercase">
                  Danh Mục
                </h2>
                <ul className="space-y-2">
                  {legal.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.link}
                        className="text-white hover:underline"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phần Media */}
              <div className="lg:text-right text-center text-14">
                <div>
                  <h2 className="mb-4 font-semibold text-white uppercase">
                    Bác Ái
                  </h2>
                  <ul className="space-y-2">
                    {baxh.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.link}
                          className="text-white hover:underline"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-5">
                  <h2 className="mb-4 font-semibold text-white uppercase">
                    Media
                  </h2>
                  <ul className="space-y-2">
                    {media.map((item, index) => (
                      <li key={index}>
                        <a
                          href={item.link}
                          className="text-white hover:underline"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
        {/* Phần Bản Quyền */}
        <div className="flex items-center justify-center bg-white py-4 px-2 shadow-md">
          <span className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()}
            <p className="hover:underline inline">Hội Dòng Anh Em Đức Maria</p>.
            All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
