import React from 'react';
import Container from '@/components/Container/container';
import VideoGallery from '@/components/main/thu_vien/VideoGallery';
import Tittle from '@/components/design/Tittle';

function ThuVienPage() {
  return (
    <Container>
      <Tittle name="THƯ VIỆN VIDEO" />
      <VideoGallery />
    </Container>
  );
}

export default ThuVienPage;
