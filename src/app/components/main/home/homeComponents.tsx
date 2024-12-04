'use client'; // Ensures this is a client component

import { Invitation } from './components/Invitation';
import 'react-calendar/dist/Calendar.css'; // Import CSS của react-calendar
import { Prayer } from './components/Prayer';
import { Congregation } from './components/Congregation';
import { News } from '@/app/components/main/home/components/New';
import { Activity } from '@/app/components/main/home/components/activity';
import Header from '../../design/Header';
import PushButton from '../../design/Head';
import HomeContainer from '../../Container/homeContainer';

export const Content = () => {
  return (
    <div className="mt-16">
      <HomeContainer>
        <PushButton label="Tin Tức" href="/news" />

        <News />
      </HomeContainer>
      <br />
      <HomeContainer>
        <Header name="5 Phút Lời Chúa Mỗi Ngày" />
        <Prayer />
      </HomeContainer>

      <br />
      <HomeContainer>
        <PushButton label="Bài Viết" href="/Blog" />
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
