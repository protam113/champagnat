'use client';
import React from 'react';
import banner from '@/assets/image/about-2.jpg';
import Image from 'next/image';
import StageOne from '@/components/main/on_goi/Stages/stageOne';
import StageTwo from '@/components/main/on_goi/Stages/stageTwo';
import StageThree from '@/components/main/on_goi/Stages/stageThree';
import StageFour from '@/components/main/on_goi/Stages/stageFour';
import Contact from '@/components/design/formResgister';
const page = () => {
  return (
    <div className="container w-full max-w-[1400px] px-[10px] mx-auto relative ">
      {/* <CacGiaiDoanDaoTao /> */}
      <header className="relative lg:h-screen h-[50vh] w-full text-white">
        <Image
          className="absolute brightness-50 top-0 left-0 w-full h-full  object-cover"
          src={banner}
          alt="Parallax Background"
          layout="fill"
        />
        <div className="relative flex flex-col items-center lg:pt-8  h-full">
          <div className="bg-gray-300/5 max-w-3xl backdrop-blur-lg p-5 text-center">
            <h1 className="lg:text-5xl text-16 font-bold text-gray-100">
              Các Giai Đoạn Huấn Luyện Của Hội Dòng Anh Em Đức Maria
            </h1>
            <p className="lg:text-xl text-14 text-white mt-4 ">
              Hội Dòng Anh Em Đức Maria hân hoan chào đón các bạn đến chia sẻ
              đời sống tu sĩ với các Tu Huynh trong Hội Dòng.
            </p>
          </div>
        </div>
      </header>

      <div>
        <StageOne />

        <StageTwo />

        <StageThree />

        <StageFour />
      </div>

      <Contact />
    </div>
  );
};

export default page;
