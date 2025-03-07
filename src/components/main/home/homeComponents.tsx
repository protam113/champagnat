import { Invitation } from './components/Invitation';
import PushButton from '../../design/Head';
import Header from '../../design/Header';
import { Donation } from './components/donationProb';
import Container from '../../Container/container';
import { News } from './components/New';
import { Activity } from './components/activity';
import Congregation from './components/Congregation';
import MessageFounder from './components/Mesage';
import { TuLieu } from './components/Document';

export const Content = () => {
  return (
    <div className="mt-16">
      <Container>
        <PushButton label="Đôi Nét Về Hội Dòng" href="/hoi_dong/about_us" />
        <News />
        <PushButton
          label="Thư Đấng Sáng Lập"
          href="/founder/letter_from_the_founder"
        />
        <MessageFounder />
        <PushButton label="Giáo Hội" href="/blog" />
        <Congregation />

        <PushButton label="Sứ Vụ" href="/hoi_dong/su_vu" />
        <Invitation />

        <PushButton label="Quyên Góp" href="/donation " />
        <Donation />

        <Header name="Dự Án" />
        <Activity />

        <PushButton label="Tư Liệu" href="/document" />
        <TuLieu />
      </Container>
    </div>
  );
};
