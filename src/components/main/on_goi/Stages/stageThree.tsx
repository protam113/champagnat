import Image from 'next/image';
import React from 'react';
import tapvien from '@/assets/image/tapvien.jpg';
import tapvien2 from '@/assets/image/tapvien2.jpg';

const StageThree = () => {
  return (
    <div className=" pt-10">
      <div
        data-aos="fade-up-right"
        className="bg-[#EBEBEB] grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-center "
      >
        {/* Hình ảnh */}
        <div className="w-full h-[250px] lg:h-[300px]">
          {' '}
          {/* Đặt chiều cao cố định cho hình ảnh */}
          <Image
            src={tapvien}
            alt="detu"
            className="object-cover w-full h-full"
            width={400}
            height={300}
          />
        </div>

        {/* Nội dung chữ */}
        <div className="p-8">
          <h2 className="lg:text-4xl text-26 font-semibold text-gray-800 mb-4">
            III. Giai đoạn Tập Viện
          </h2>
          <p className="text-lg text-gray-600">Thời gian: 2 năm</p>
        </div>
      </div>

      <div className=" grid grid-cols-12 gap-5 mt-5">
        {/* Phần bên trái với 2 phần, mỗi phần có 3 dòng */}
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          className=" grid grid-rows-2 gap-5 col-span-12 lg:col-span-7"
        >
          {/* Phần 1 */}
          <div className="p-4 bg-[#EBEBEB]">
            <h2 className="text-24 font-semibold text-gray-800 pb-2">
              1. Mục đích
            </h2>
            <ul className="list-disc text-14 pl-5">
              <li>
                Tập Viện là giai đoạn khởi đầu đời sống trong Hội Dòng, là thời
                gian quan trọng nhất trong hành trình huấn luyện và nhằm mục
                đích:
              </li>
              <li>
                Giúp ứng sinh nhận biết chắc chắn và rõ ràng hơn ơn gọi của mình
                và của Dòng Anh Em Đức Maria
              </li>
              <li>Thực nghiệm lốii sống của Hội Dòng</li>
              <li>Uốn nắn trí tuệ và trái tim theo tinh thần của Hội Dòng.</li>
              <li>
                Hội Dòng kiểm chứng ý định và tư cách thích đáng của ứng sinh
                đối với đời sống tu trì trong Hội Dòng.
              </li>
            </ul>
          </div>

          {/* Phần 2 */}
          <div className="p-4  bg-[#EBEBEB]">
            <h2 className="text-24 font-semibold text-gray-800 pb-2">
              2. Chương trình huấn luyện
            </h2>
            <p>a. Tập sinh phải được hướng dẫn:</p>
            <ul className="list-disc text-14 pl-5">
              <li>Vun trồng các đức tin nhân bản và Kitô giáo</li>
              <li>
                Học tập nguyện ngắm và từ bỏ mình như là những phương thế hữu
                hiệu nhất để đạt tới sự hoàn thiện
              </li>
              <li>
                Đọc và suy niệm Kinh Thánh để chiêm ngưỡng mầu nhiệm cứu độ
              </li>
              <li>Học phụng vụ để tôn thờ Thiên Chúa cách xứng hợp</li>
              <li>
                Tập sống đời thánh hiến cho Thiên Chúa và tha nhân tỏng Đức Kitô
                bằng các lời khuyên Phúc Âm
              </li>
              <li>
                Nắm vũng đặc tính, tinh thần, mục đích, kỷ luật, lịch sử và đời
                sống của Hội Dòng
              </li>
              <li>Thấm nhuần tinh thần yêu mến Giáo hội và các vị chủ chăn</li>
            </ul>
            <p>
              b. Tập sinh không được học những môn và đảm nhận những phận sự
              không trực tiếp có lợi cho việc huấn luyện.
            </p>
          </div>
        </div>

        {/* Phần bên phải với hình ảnh */}
        <div
          data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="500"
          className="col-span-12 lg:col-span-5 "
        >
          <div className="w-full h-full">
            <Image
              src={tapvien2}
              alt="detu"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageThree;
