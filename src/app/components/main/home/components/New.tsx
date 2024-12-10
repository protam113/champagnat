'use client'; // Ensures this is a client component

import Image from 'next/image';
import news from '@/assets/image/news.png';
import CalendarCustom from './Calendar';

export const News = () => {
  return (
    <>
      {/* Phần nội dung: Hình ảnh, text và lịch */}
      <div className="flex r justify-between pt-5 gap-2">
        <div>
          <Image src={news} alt="news" />
          <p className="mt-4 text-sm">
            Vatican News (31.8.2024) - Nhân dịp Tổng Công Nghị của Dòng
            Phanxicô, Đức Thánh cha Phanxicô đã khuyến khích các tu sĩ của Dòng
            tiếp tục giữ cam kết gìn giữ hòa bình.
          </p>
        </div>

        {/* Phần lịch */}
        <div className="">
          <CalendarCustom />
        </div>
      </div>
    </>
  );
};
