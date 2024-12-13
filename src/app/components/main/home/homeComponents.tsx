'use client'; // Ensures this is a client component

import { Invitation } from './components/Invitation';
// import { Prayer } from './components/Prayer';
import { Congregation } from './components/Congregation';
import { News } from '@/app/components/main/home/components/New';
import { Activity } from '@/app/components/main/home/components/activity';
import PushButton from '../../design/Head';
import HomeContainer from '../../Container/homeContainer';
import Header from '../../design/Header';
import { Vocation } from './components/vocation';
import { Donation } from './components/donationProb';

export const Content = () => {
  return (
    <div className="mt-16">
      <HomeContainer>
        <PushButton label="Đôi Nét Về Chúng Tôi" href="/hoi_dong/about_us" />

        <News />
      </HomeContainer>
      <HomeContainer>
        <PushButton label="Bài Viết" href="/blog" />
        <Congregation />
      </HomeContainer>

      <HomeContainer>
        <PushButton label="Sứ Vụ" href="/hoi_dong/su_vu" />
        <Invitation />
      </HomeContainer>
      <HomeContainer>
        <PushButton label="Quyên Góp" href="/donation " />

        <Donation />
      </HomeContainer>
      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mx-auto"
        style={{ width: '1420px' }}
      >
        {/* Cột 1: Ơn Gọi */}
        <div>
          <Header name="Ơn Gọi" />
          <Vocation />
        </div>

        {/* Cột 2: Sự Kiện */}
        <div>
          <Header name="Sự Kiện" />
          <Activity />
        </div>
      </div>
    </div>
  );
};
