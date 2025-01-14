import Image from 'next/image';
import React from 'react';
import thinhsinh from '@/assets/image/thinh sinh1.jpg';
const StageTwo = () => {
  return (
    <div className="pt-10">
      <div
        data-aos="fade-up-left"
        className="bg-[#EBEBEB] grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-center  "
      >
        {/* Hình ảnh */}
        <div className="w-full h-[250px] lg:h-[300px]">
          {' '}
          {/* Đặt chiều cao cố định cho hình ảnh */}
          <Image
            src={thinhsinh}
            alt="detu"
            className="object-cover w-full h-full"
            width={400}
            height={300}
          />
        </div>

        {/* Nội dung chữ */}
        <div className="p-8">
          <h2 className="lg:text-4xl text-26 font-semibold text-gray-800 mb-4">
            II. Giai đoạn Thỉnh Sinh
          </h2>
          <p className="text-lg text-gray-600">
            Đối tượng: Các em Qua Giai Đoạn Đệ Tử
          </p>
          <p className="text-lg text-gray-600">Thời gian: 2 năm</p>
        </div>
      </div>

      <div className=" grid grid-cols-12 gap-5 mt-5">
        {/* Phần bên trái với 2 phần, mỗi phần có 3 dòng */}
        <div
          data-aos="fade-up-left"
          className="grid grid-rows-2 gap-5 col-span-12 lg:col-span-7"
        >
          {/* Phần 1 */}
          <div className="p-4  bg-[#EBEBEB]">
            <h2 className="text-24 font-semibold text-gray-800 pb-2">
              1. Mục đích
            </h2>
            <ul className="list-disc text-14 pl-5">
              <li>Giúp ứng sinh nhận biết ơn gọi của mình và của Hội Dòng</li>
              <li>
                Giúp Hội Dòng tìm hiểu tính tình, khả năng và lý do chọn lựa đời
                sống tu trì của ứng sinh
              </li>
              <li>
                Chuẩn bị cho ứng sinh vào Tập Viện bằng cách cho tham gia đầy đủ
                đời sống cầu nguyện và sinh hoạt cộng đoàn, trong giới hạn một
                Thỉnh Sinh.
              </li>
            </ul>
          </div>

          {/* Phần 2 */}
          <div className="p-4   bg-[#EBEBEB]">
            <h2 className="text-24 font-semibold text-gray-800 pb-2">
              2. Chương trình huấn luyện
            </h2>
            <ul className="list-disc text-14 pl-5">
              <li>Nhân bản trong đời tu</li>
              <li>Tập sống quân bình tâm lý</li>
              <li>Cầu nguyện</li>
              <li>Nguyện ngắm</li>
            </ul>
          </div>
        </div>

        {/* Phần bên phải với hình ảnh */}
        <div data-aos="fade-up-right" className="col-span-12 lg:col-span-5 ">
          <div className="w-full h-full">
            <Image
              src={thinhsinh}
              alt="detu"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageTwo;
