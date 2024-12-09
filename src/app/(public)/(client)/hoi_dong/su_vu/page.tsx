import React from 'react';
import Container from '@/app/components/Container/container';
import SuvuContent from '@/app/components/main/su_vu/SuvuContent';
import Heading from '@/app/components/design/Heading';

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
      {/* Phần bài viết nổi bật */}
      {/* <section className="mb-16">
          <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={img}
              alt="Bài viết nổi bật"
              layout="fill"
              objectFit="cover"
              className="hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="text-center mt-6">
            <h2 className="text-2xl font-semibold">Tiêu đề bài viết nổi bật</h2>
            <p className="text-gray-600">Ngày đăng: 22/12/2023</p>
            <p className="text-gray-700 mt-4">
              Một bài viết nổi bật giới thiệu về những dự án quan trọng mà chúng
              tôi đang thực hiện.
            </p>
          </div>
        </section> */}

      {/* Danh sách bài viết theo dạng lưới */}
      <SuvuContent />

      {/* Phần câu hỏi thường gặp */}
      {/* <section className="mb-16">
          <h2 className="text-3xl font-semibold text-primary-700 mb-8">
            Câu hỏi thường gặp
          </h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-lg hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold">
                  Câu hỏi {index + 1}: Đây là câu hỏi thường gặp?
                </h3>
                <p className="text-gray-600 mt-2">
                  Đây là câu trả lời chi tiết cho câu hỏi này. Nó cung cấp thông
                  tin hữu ích để người dùng hiểu rõ hơn về chúng tôi.
                </p>
              </div>
            ))}
          </div>
        </section> */}

      {/* Phần liên hệ */}
      {/* <section className="bg-primary-100 p-10 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-semibold text-primary-700 mb-4">
            Liên hệ với chúng tôi
          </h2>
          <p className="text-gray-700 mb-6">
            Nếu bạn có bất kỳ câu hỏi hoặc cần thêm thông tin, vui lòng liên hệ
            với chúng tôi qua email hoặc số điện thoại.
          </p>
          <Link href="/lien-he" passHref>
            <button className="bg-primary-500 text-white px-6 py-3 rounded-lg shadow hover:bg-primary-600 transition-colors">
              Liên hệ ngay
            </button>
          </Link>
        </section> */}
    </Container>
  );
};

export default SuVuPage;
