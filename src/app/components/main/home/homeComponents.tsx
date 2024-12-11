'use client'; // Ensures this is a client component

import { Invitation } from './components/Invitation';
import { Prayer } from './components/Prayer';
import { Congregation } from './components/Congregation';
import { News } from '@/app/components/main/home/components/New';
import { Activity } from '@/app/components/main/home/components/activity';
import PushButton from '../../design/Head';
import HomeContainer from '../../Container/homeContainer';

export const Content = () => {
  return (
    <div className="mt-16">
      <HomeContainer>
        <PushButton label="Đôi Nét Về Chúng Tôi" href="/hoi_dong/about_us" />

        <News />
      </HomeContainer>
      <br />
      <HomeContainer>
        <PushButton label="Bài Viết" href="/new " />
        <Invitation />
      </HomeContainer>
      {/* 
      <div className="w-full flex flex-col items-center">
        <h1 className="text-center font-bold text-4xl">
          <span className="block text-blue-800">Marists</span>
          <span className="block relative w-full">
            <span className="absolute left-1/2 transform -translate-x-1/2 text-lg font-light text-gray-500">
              of
            </span>
            <hr className="w-3/4 mx-auto border-t-2 border-blue-800 mt-2" />
          </span>
          <span className="block text-blue-800">Champagnat</span>
        </h1>
      </div> */}
      <div className="w-full flex flex-col items-center">
        <div className="logo-holder logo-4">
          <a href="">
            <h3>Marists</h3>
            <p>of Champagnat</p>
          </a>
        </div>
      </div>
      <br />
      <HomeContainer>
        <PushButton label="Bài Viết" href="/blog" />
        <Congregation />
      </HomeContainer>

      <br />
      <HomeContainer>
        <PushButton label="Ơn gọi" href="/hoi_dong/on_goi" />
        <Invitation />
      </HomeContainer>
      <br />
      <HomeContainer>
        <PushButton label="Sự Kiện" href="/hoi_dong/events" />
        <Activity />
      </HomeContainer>
    </div>
  );
};
