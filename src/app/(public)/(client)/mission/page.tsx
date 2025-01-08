import Container from '@/components/Container/container';
import Heading from '@/components/design/Heading';
import SuvuContent from '@/components/main/mission/SuvuContent';
import React from 'react';

const SuVuPage = () => {
  return (
    <Container>
      {/* Phần tiêu đề */}
      <div className="text-center mb-10">
        <Heading name="Sứ Vụ" />
        <p className="text-gray-700 mt-2 text-lg">
          Tìm hiểu về những giá trị cốt lõi và mục tiêu chúng tôi hướng đến.
        </p>
      </div>

      {/* Danh sách bài viết theo dạng lưới */}
      <SuvuContent />
    </Container>
  );
};

export default SuVuPage;
