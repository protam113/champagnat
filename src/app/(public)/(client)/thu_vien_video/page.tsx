import React from 'react';
import Container from '@/components/Container/container';
import NewsGallery from '@/components/main/thu_vien/NewsGallery';
import BlogsGallery from '@/components/main/thu_vien/BlogsGallery';
import QuyenGopGallery from '@/components/main/thu_vien/QuyenGopGallery';
import SuVuGallery from '@/components/main/thu_vien/SuVuGallery';
import OnGoiGallery from '@/components/main/thu_vien/OnGoiGallery';
import Header from '@/components/design/Header';

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

      {/* Cột 1: Ơn Gọi */}
      <div className="pt-5">
        <Header name="Ơn Gọi & Sự Kiện" />
        <OnGoiGallery />
      </div>
    </Container>
  );
}

export default ThuVienPage;
