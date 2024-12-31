import React from 'react';
import Container from '@/components/Container/container';
import NewsGallery from '@/components/main/thu_vien/NewsGallery';
import PushButton from '@/components/design/Head';
import BlogsGallery from '@/components/main/thu_vien/BlogsGallery';
import QuyenGopGallery from '@/components/main/thu_vien/QuyenGopGallery';
import SuVuGallery from '@/components/main/thu_vien/SuVuGallery';
import OnGoiGallery from '@/components/main/thu_vien/OnGoiGallery';
import Header from '@/components/design/Header';
import EventsGallery from '@/components/main/thu_vien/EventsGallery';
function ThuVienPage() {
  return (
    <Container>
      <Header name="Tin Tức" />
      <NewsGallery />

      <div className="pt-5">
        <Header name="Bài Viết" />
        <BlogsGallery />
      </div>

      <div className="pt-5">
        <Header name="Quyên Góp" />
        <QuyenGopGallery />
      </div>

      <div className="pt-5">
        <Header name="Sự Vụ" />
        <SuVuGallery />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 mx-auto">
        {/* Cột 1: Ơn Gọi */}
        <div>
          <Header name="Ơn Gọi" />
          <OnGoiGallery />
        </div>

        {/* Cột 2: Sự Kiện */}
        <div>
          <Header name="Sự Kiện" />
          <EventsGallery />
        </div>
      </div>
    </Container>
  );
}

export default ThuVienPage;
