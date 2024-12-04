'use client'; // Ensures this is a client component

import Image from 'next/image';
import React from 'react';
import congregation from '@/assets/image/congregation.png';
import bannerImage from '@/assets/image/banner.png';
export const Invitation = () => {
  const HadleOnClick = () => {
    alert('hello');
  };

  return (
    <div>
      {/* Phần nội dung: Hình ảnh, text và lịch */}
      <div className="flex  justify-between pt-5 cursor-pointer">
        <div onClick={HadleOnClick}>
          <Image src={congregation} alt="news" width={700} height={300} />
          <h3 className="mt-4 text-sm font-bold">
            Mừng Kính Thánh Phanxicô Assisi: Bổn mạng Gia đình Học viện năm
          </h3>
          <p className="mt-1 text-sm">
            Trong niềm hân hoan mừng kính Thánh Phanxicô Assisi – Bổn mạng gia
            đình Học viện, Học xá Học viện đã long trọng cử hành Thánh lễ tạ ơn
            mừng kính Thánh Bổn mạng vào lúc 10g00 thứ Bảy, ngày 05.10.2024.
            <br />
            cử hành Thánh lễ tạ ơn mừng kính Thánh Bổn mạng vào lúc 10g00 thứ
            Bảy, ngày 05.10.2024. cử hành Thánh lễ tạ ơn mừng kính Thánh Bổn
            mạng vào lúc 10g00 thứ Bảy, ngày 05.10.2024.{' '}
            <button className="text-black font-semibold">Xem Thêm</button>
          </p>
        </div>
        <div className="grid gap-3 ">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="rounded-lg flex items-start justify-between gap-2 bg-secondary-50"
            >
              <Image
                src={bannerImage}
                alt="News Image"
                width={130}
                objectFit="cover"
                className="rounded-md"
              />
              <div className="w-50">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-xs">DongDaMinh</p>
                  <p>•</p>
                  <p className="text-[#9C9C9C] text-xs">07/10/2024 19:28</p>
                </div>
                <h4 className="font-semibold ">
                  Đức Giáo hoàng Phanxicô đã công bố tổ chức Công nghị Hồng y
                  vào ngày 08.12.2024
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
