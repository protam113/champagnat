'use client'; // Ensures this is a client component

import { useEffect } from 'react';
import Image from 'next/image';
import news from '@/assets/image/hero.jpg';
import CalendarCustom from './Calendar';
import { useCreateVisit } from '@/hooks/visit/useVisit';

export const News = () => {
  const { mutate } = useCreateVisit();

  // Gọi mutate khi component được render và khi trang được tải lại
  useEffect(() => {
    mutate(); // Gọi mutate mỗi khi trang được load lại
  }, []); // Chạy chỉ một lần khi component mount

  return (
    <>
      {/* Phần nội dung: Hình ảnh, text và lịch */}
      <div className="flex flex-col lg:flex-row py-4 gap-2">
        {/* Phần nội dung */}
        <div className="max-w-4xl mx-auto py-2 px-2 sm:py-2 sm:px-6">
          <div className="text-center">
            <p className="mt-1 text-24 font-light text-stone-900 sm:text-5xl sm:tracking-tight lg:text-25">
              Dòng Anh Em Đức Maria
            </p>
          </div>
          <div className="mt-16">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative">
                <Image
                  className="w-full rounded-lg shadow-lg"
                  src={news}
                  alt="Our monastery"
                  width={600}
                  height={400}
                />
              </div>
              <div className="lg:mt-0 pt-4">
                <div className=" text-justify mx-auto lg:max-w-none">
                  <p className="text-22 text-stone-700">
                    <strong>Dòng Anh Em Đức Maria</strong> được thành lập năm
                    1817 tại một ngôi làng ở vùng Loire, La Valla, nước Pháp.{' '}
                  </p>
                  <div className="mt-5 prose prose-stone text-stone-600">
                    <p>
                      Mục tiêu của Đấng Sáng Lập, Cha Thánh Marcellin
                      Champagnat, là giáo dục cho trẻ em ở nông thôn. Dòng phát
                      triển nhanh chóng tại Pháp trong thế kỷ 19, đặc biệt là ở
                      miền Đông Nam và miền Bắc, tạo thành một mạng lưới chặt
                      chẽ gồm các trường học nông thôn và thành thị. Đến năm
                      1902, trước khi bị nhà nước giải thể, Dòng Anh Em Đức
                      Maria đã rất mạnh với khoảng 600 cơ sở giáo dục tiểu học
                      và trung học (các trường giáo xứ, trường công nghiệp,
                      trường nội trú, nhà đào tạo...) do khoảng 3,000 Sư Huynh
                      điều hành. Trong số các dòng tu huynh được thành lập trong
                      thế kỷ 19, từ năm 1815 đến 1830 (Dòng De la Mennais, Dòng
                      Marianists, Dòng St Gabriel),{' '}
                    </p>
                    <p>
                      Dòng Anh Em Đức Maria là dòng phát triển mạnh mẽ nhất về
                      số lượng. Từ những năm 1880, Dòng bắt đầu mở rộng ra quốc
                      tế. Việc bị nhà nước Pháp giải thể vào năm 1903 không ngăn
                      cản được khoảng một nghìn Sư Huynh tiếp tục giảng dạy như
                      những giáo viên. Nhờ việc đào tạo những người kế tục và
                      các giáo dân cộng tác viên, Dòng đã đóng góp vào sự thay
                      đổi trong giáo dục Công giáo.{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Phần lịch */}
        <div className="flex-[1] lg:flex-[1]">
          <CalendarCustom />
        </div>
      </div>
    </>
  );
};
