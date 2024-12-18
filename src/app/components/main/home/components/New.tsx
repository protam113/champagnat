'use client'; // Ensures this is a client component

import Image from 'next/image';
import news from '@/assets/image/history.jpg';
import CalendarCustom from './Calendar';

export const News = () => {
  return (
    <>
      {/* Phần nội dung: Hình ảnh, text và lịch */}
      <div className="flex justify-between py-10 gap-4">
        {/* Phần nội dung */}
        <div className="flex-[4]">
          <Image src={news} alt="news" height={200} width={1100} />
          <p className="mt-4 text-sm">
            <strong>Dòng Anh Em Đức Maria</strong> được thành lập năm 1817 tại
            một ngôi làng ở vùng Loire, La Valla, nước Pháp. Mục tiêu của Đấng
            Sáng Lập, Cha Thánh Marcellin Champagnat, là giáo dục cho trẻ em ở
            nông thôn. Dòng phát triển nhanh chóng tại Pháp trong thế kỷ 19, đặc
            biệt là ở miền Đông Nam và miền Bắc, tạo thành một mạng lưới chặt
            chẽ gồm các trường học nông thôn và thành thị. Đến năm 1902, trước
            khi bị nhà nước giải thể, Dòng Anh Em Đức Maria đã rất mạnh với
            khoảng 600 cơ sở giáo dục tiểu học và trung học (các trường giáo xứ,
            trường công nghiệp, trường nội trú, nhà đào tạo...) do khoảng 4,300
            Sư Huynh điều hành. Trong số các dòng tu huynh được thành lập trong
            thế kỷ 19, từ năm 1815 đến 1830 (Dòng De la Mennais, Dòng
            Marianists, Dòng St Gabriel), Dòng Anh Em Đức Maria là dòng phát
            triển mạnh mẽ nhất về số lượng. Từ những năm 1880, Dòng bắt đầu mở
            rộng ra quốc tế. Việc bị nhà nước Pháp giải thể vào năm 1903 không
            ngăn cản được khoảng một nghìn Sư Huynh tiếp tục giảng dạy như những
            giáo viên. Nhờ việc đào tạo những người kế tục và các giáo dân cộng
            tác viên, Dòng đã đóng góp vào sự thay đổi trong giáo dục Công giáo.
          </p>
        </div>

        {/* Phần lịch */}
        <div className="flex-[1]">
          <CalendarCustom />
        </div>
      </div>
    </>
  );
};
