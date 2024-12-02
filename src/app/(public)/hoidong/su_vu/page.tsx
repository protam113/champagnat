import React from "react";
import Container from "@/app/components/Container/container";
import Image from "next/image";
import Link from "next/link";
import img from "@/assets/image/banner.png";

const SuVuPage = () => {
  return (
    <Container>
      <div className="container mx-auto px-4 py-10">
        {/* Phần tiêu đề */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold text-primary-900">Sứ Vụ</h1>
          <p className="text-gray-700 mt-2 text-lg">
            Tìm hiểu về những giá trị cốt lõi và mục tiêu chúng tôi hướng đến.
          </p>
          <div className="text-sm text-gray-500 mt-4">
            <Link href="/" passHref>
              <span className="hover:text-primary-500 cursor-pointer">
                Trang Chủ
              </span>
            </Link>
            {" > "}
            <span className="text-primary-500">Sứ Vụ</span>
          </div>
        </header>

        {/* Phần giới thiệu */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-semibold text-primary-700 mb-4">
            Sứ mệnh của chúng tôi
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Chúng tôi cam kết mang đến những giá trị tốt đẹp nhất cho cộng đồng
            thông qua các hoạt động, dự án và sáng kiến mang tính bền vững.
          </p>
        </section>

        {/* Phần bài viết nổi bật */}
        <section className="mb-16">
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
        </section>

        {/* Danh sách bài viết theo dạng lưới */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-primary-700 mb-8">
            Bài viết gần đây
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={img}
                    alt={`Bài viết ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    Tiêu đề bài viết {index + 1}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">
                    Ngày đăng: 14/12/2023
                  </p>
                  <p className="text-gray-700 mt-4">
                    Một đoạn mô tả ngắn về bài viết để thu hút sự chú ý của
                    người đọc.
                  </p>
                  <Link href={`/baiviet/${index + 1}`} passHref>
                    <span className="text-primary-500 hover:underline text-sm mt-4 inline-block">
                      Đọc thêm
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Phần câu hỏi thường gặp */}
        <section className="mb-16">
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
        </section>

        {/* Phần liên hệ */}
        <section className="bg-primary-100 p-10 rounded-lg shadow-lg text-center">
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
        </section>
      </div>
    </Container>
  );
};

export default SuVuPage;
