'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import CSS cho AOS

const StageOne = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-out' }); // Khởi tạo AOS với các tham số
  }, []);

  return (
    <div className="pt-10">
      <div
        data-aos="fade-up"
        className="bg-[#EBEBEB] grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-center "
      >
        {/* Hình ảnh */}
        <div className="w-full h-[250px] lg:h-[300px]">
          {/* Đặt chiều cao cố định cho hình ảnh */}
          <Image
            src="/img/detu.jpg"
            alt="detu"
            className="object-cover w-full h-full"
            width={400}
            height={300}
          />
        </div>

        {/* Nội dung chữ */}
        <div className="p-8">
          <h2 className="lg:text-4xl text-26 font-semibold text-gray-800 mb-4">
            I. Giai đoạn Đệ Tử
          </h2>
          <p className="text-lg text-gray-600">
            Đối tượng: Các em tốt nghiệp PTTH, Cao Đẳng hoặc Đại học
          </p>
          <p className="text-lg text-gray-600">Thời gian: 1 năm</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mt-5">
        {/* Phần bên trái với 2 phần, mỗi phần có 3 dòng */}
        <div
          data-aos="fade-right"
          className="grid grid-rows-2 gap-5 col-span-12 lg:col-span-7"
        >
          {/* Phần 1 */}
          <div className="p-4  bg-[#EBEBEB]">
            <h2 className="text-24 font-semibold text-gray-800 ">
              1. Mục đích
            </h2>
            <p className="text-20 text-gray-600 py-2">
              Để thẩm định ơn gọi giữa Hội Dòng và các em theo 5 bước:
            </p>
            <ul className="list-disc text-14 pl-5">
              <li>Chúa gọi trực tiếp hay thông qua một ai đó</li>
              <li>Ứng sinh có “Thích” và “Hợp” để sống ơn gọi</li>
              <li>Muốn đi theo Chúa</li>
              <li>Được Chúa biến đổi và sống hòa đồng trong đời tu</li>
              <li>
                Chu toàn bổn phận thiêng liêng và tự nhiên một cách kiên trì.
              </li>
              <li>
                Chuẩn bị cho ứng sinh vào Thỉnh Sinh bằng cách cho tham gia đầy
                đủ đời sống cầu nguyện và sinh hoạt cộng đoàn, trong giới hạn
                một Để Tử.
              </li>
            </ul>
          </div>

          {/* Phần 2 */}
          <div className="p-4   bg-[#EBEBEB]">
            <h2 className="text-24 font-semibold text-gray-800 ">
              2. Chương trình huấn luyện
            </h2>
            <p className="text-20 text-gray-600 py-2">
              Các ứng sinh sẽ được học hỏi về:
            </p>
            <ul className="list-disc text-14 pl-5">
              <li>Tiếng Anh</li>
              <li>Nhân bản</li>
              <li>Tri thức</li>
              <li>Giáo lý</li>
              <li>Tông đồ</li>
              <li>Đức tin</li>
              <li>Học về Tiểu sử Đấng Sáng lập</li>
            </ul>
          </div>
        </div>

        {/* Phần bên phải với hình ảnh */}
        <div data-aos="fade-left" className="col-span-12 lg:col-span-5 ">
          <div className="w-full h-full">
            <Image
              src="/img/detu3.jpg"
              alt="detu3"
              className="object-cover w-full h-full"
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageOne;
