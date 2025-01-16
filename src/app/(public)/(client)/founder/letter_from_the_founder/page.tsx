import Container from '@/components/Container/container';
import Heading from '@/components/design/Heading';
import MessageContent from '@/components/main/message/messageContent';
import React from 'react';

const Page = () => {
  return (
    <Container>
      {/* Phần tiêu đề */}
      <div className="text-center mb-10">
        <Heading name="Thư của Đấng Sáng Lập" />
        <p className="text-gray-700 mt-2 text-lg">
          Lắng nghe những chia sẻ từ người sáng lập về tầm nhìn và sứ mệnh của
          chúng tôi.
        </p>
      </div>

      {/* Danh sách bài viết theo dạng lưới */}
      <MessageContent />
    </Container>
  );
};

export default Page;
