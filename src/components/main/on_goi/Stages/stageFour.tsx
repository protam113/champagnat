import Image from 'next/image';
import React from 'react';
import hocvien from '@/assets/image/Hocvien1.jpg';
import hocvien2 from '@/assets/image/hocvien2.jpg';

const StageFour = () => {
  return (
    <div className="pt-10">
      <div
        data-aos="fade-up"
        className="bg-[#EBEBEB] grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-center "
      >
        {/* Hình ảnh */}
        <div className="w-full h-[250px] lg:h-[300px]">
          {' '}
          {/* Đặt chiều cao cố định cho hình ảnh */}
          <Image
            src={hocvien}
            alt="detu"
            className="object-cover w-full h-full"
            width={400}
            height={300}
          />
        </div>

        {/* Nội dung chữ */}
        <div className="p-8">
          <h2 className="lg:text-4xl text-26 font-semibold text-gray-800 mb-4">
            IV. Giai đoạn Học Viện
          </h2>
          <p className="text-lg text-gray-600">Thời gian: 6 năm</p>
        </div>
      </div>

      <div className=" grid grid-cols-12 gap-5 mt-5">
        {/* Phần bên trái với 2 phần, mỗi phần có 3 dòng */}
        <div
          data-aos="fade-down-right"
          className="grid grid-rows-2 gap-5 col-span-12 lg:col-span-7"
        >
          {/* Phần 1 */}
          <div className="p-4 bg-[#EBEBEB]">
            <h2 className="text-24 font-semibold text-gray-800">1. Mục đích</h2>
            <p className="py-2">
              Giúp kiện toàn việc huấn luyện các Sư Huynh khấn tạm bằng cách:
            </p>
            <ul className="list-disc text-14 pl-5">
              <li>
                Hướng dẫn chị em đến sự dâng hiến trọn vẹn và dứt khoát cho Chúa
                Kitô trong đời sống đặc thù của Hội Dòng
              </li>
              <li>
                Trau dồi cho chị em có khả năng chu toàn sứ mạng của Dòng Anh Em
                Đức Maria cách thích đáng hơn.
              </li>
              <li>
                Giúp chị em hòa hợp các yếu tố của chương trình huấn luyện sao
                cho có được một đời sống thuần nhất.
              </li>
            </ul>
          </div>

          {/* Phần 2 */}
          <div className="p-4  bg-[#EBEBEB]">
            <h2 className="text-24 font-semibold text-gray-800 pb-2">
              2. Chương trình huấn luyện
            </h2>
            <p>a. Đời sống thiêng liêng</p>
            <ul className="list-disc text-14 pl-5">
              <li>
                Đào sâu linh đạo của Cha Thánh Marcelline Champagnat và Dòng Anh
                Em Đức Maria..
              </li>
              <li>
                Đào sâu mầu nhiệm  Chúa Kitô, mầu nhiệm Thiên Chúa Ba Ngôi và
                mầu nhiệm Giáo Hội.
              </li>
              <li>
                Học Kinh Thánh, đặc biệt Thánh vịnh, Phúc âm và các thư của
                Thánh Phaolô.
              </li>
            </ul>
            <p>
              b. Tập sinh không được học những môn và đảm nhận những phận sự
              không trực tiếp có lợi cho việc huấn luyện.
            </p>
            <ul className="list-disc text-14 pl-5">
              <li>Học lịch sử Giáo hội Công Giáo</li>
              <li>Học sư phạm giáo lý</li>
              <li>
                Huấn luyện về khả năng chuyên môn, học nghề hoặc bổ túc nghiệp
                vụ để nâng cao hiệu năng các công việc do Hội Dòng và cộng đoàn
                giao phó.
              </li>
            </ul>
          </div>
        </div>

        {/* Phần bên phải với hình ảnh */}
        <div data-aos="fade-down-left" className="col-span-12 lg:col-span-5 ">
          <div className="w-full h-full">
            <Image
              src={hocvien2}
              alt="detu"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageFour;
