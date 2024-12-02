"use client";

import Container from "@/app/components/Container/container";
import money from "@/assets/image/banner.png";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const DonatePage = () => {
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  const toggleTestimonials = () => {
    setShowAllTestimonials(!showAllTestimonials);
  };
  return (
    <Container>
      <div className="bg-gray-50">
        <header className="mb-16">
          <h1 className="text-center text-4xl font-bold text-primary-900">
            Quyên Góp Cho Mục Tiêu Tốt Đẹp
          </h1>
          <div className="text-sm text-center text-gray-500 mt-2">
            <Link href="/" passHref>
              <span className="hover:text-primary-500 cursor-pointer">
                Home
              </span>
            </Link>
            {"  >  "}
            <span className="text-primary-500">Quyên Góp</span>
          </div>

          {/* Văn bản mô tả thêm về cảm hứng và ý nghĩa quyên góp */}
          <div className="pt-10 space-y-6 text-lg text-gray-700 max-w-3xl mx-auto">
            <p className="transition-all duration-300 transform hover:scale-105">
              "Mỗi hành động của bạn là một phần tạo dựng nên niềm hy vọng, một
              câu chuyện mới bắt đầu, và một bước đi vững chắc trên con đường
              thay đổi thế giới."
            </p>
            <p className="transition-all duration-300 transform hover:scale-105">
              Tổ chức của chúng tôi luôn nỗ lực hỗ trợ cộng đồng gặp khó khăn,
              từ việc cung cấp học bổng cho học sinh nghèo đến việc xây dựng cơ
              sở hạ tầng và chăm sóc sức khỏe cho những người cần giúp đỡ. Chúng
              tôi tin rằng những hành động nhỏ, những đóng góp giản dị sẽ tạo
              nên sự khác biệt lớn lao trong cuộc sống của người khác.
            </p>
            {/* Thêm câu chuyện cảm hứng */}
            <p className="font-semibold text-lg text-primary-600 mt-4">
              Cùng chung tay, bạn có thể là người thay đổi số phận của một ai
              đó!
            </p>
          </div>

          {/* Thêm phần hình ảnh động hoặc minh họa động */}
          <div className="flex justify-center mt-8">
            <div className="relative group">
              <Image
                src={money} // Đảm bảo chọn hình ảnh phù hợp
                alt="Quyên góp"
                className="rounded-lg shadow-lg transition-all duration-500 transform group-hover:scale-105"
                width={800}
                height={400}
              />
              <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-all duration-300"></div>
              <div className="absolute bottom-5 left-5 text-white font-semibold text-lg transition-all duration-300 transform group-hover:translate-y-4">
                Cùng Bạn Thực Hiện Những Điều Tốt Đẹp
              </div>
            </div>
          </div>
        </header>

        {/* Header Section */}
        {/* <section className="bg-green-600 text-white py-16 text-center">
          <h1 className="text-4xl font-bold mb-6 text-shadow-md transition-all duration-300 transform hover:scale-105">
            Quyên Góp Cho Mục Tiêu Tốt Đẹp
          </h1>
          <p className="text-xl mb-8 px-4 lg:px-12 max-w-3xl mx-auto text-opacity-80">
            Mỗi đóng góp của bạn là một niềm hy vọng, là sự thay đổi tích cực
            cho những người đang gặp khó khăn. Cùng chúng tôi tạo dựng một tương
            lai tươi sáng hơn cho cộng đồng!
          </p>
          <div className="relative">
            <Image
              src={money}
              alt="Quyên góp"
              className="mx-auto rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105"
              width={800}
              height={400}
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-30 rounded-xl"></div>
          </div>
          <div className="mt-8">
            <button className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-200 transition-all duration-300">
              Hãy Tham Gia Ngay
            </button>
          </div>
        </section> */}

        {/* About Section */}
        <section className="container mx-auto py-16 px-6 lg:px-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center tracking-wide uppercase">
            Về Chúng Tôi
          </h2>
          <div className="space-y-6 text-lg text-gray-700 max-w-3xl mx-auto">
            <p className="transition-all duration-300 transform hover:scale-105">
              Tổ chức của chúng tôi luôn nỗ lực hỗ trợ cộng đồng gặp khó khăn,
              từ việc cung cấp học bổng cho học sinh nghèo đến việc xây dựng cơ
              sở hạ tầng và chăm sóc sức khỏe cho những người cần giúp đỡ.
            </p>
            <p className="transition-all duration-300 transform hover:scale-105">
              Chúng tôi tin rằng những hành động nhỏ, những đóng góp giản dị sẽ
              tạo nên sự khác biệt lớn lao trong cuộc sống của người khác.
            </p>
          </div>
          <div className="flex justify-center mt-12">
            <button className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-all duration-300">
              Tìm Hiểu Thêm
            </button>
          </div>
        </section>

        {/* How to Donate Section */}
        <section className="bg-gray-100 py-12 px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Cách Để Quyên Góp
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Chúng tôi cung cấp nhiều hình thức quyên góp để bạn có thể chọn lựa
            phù hợp. Dù là tiền bạc, vật dụng hay thời gian, mọi sự đóng góp của
            bạn đều có ý nghĩa!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Đóng Góp Tiền Mặt */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src={money}
                alt="Đóng góp tiền mặt"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-green-600 mb-4">
                Đóng Góp Tiền Mặt
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Bạn có thể đóng góp tiền mặt qua các hình thức như chuyển khoản
                ngân hàng, thẻ tín dụng, hoặc qua các kênh thanh toán trực tuyến
                trên website.
              </p>
              <button className="text-white bg-green-600 px-4 py-2 rounded-full hover:bg-green-700 transition-all duration-300">
                Đóng Góp Ngay
              </button>
            </div>

            {/* Quyên Góp Vật Dụng */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src={money}
                alt="Quyên góp vật dụng"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-green-600 mb-4">
                Quyên Góp Vật Dụng
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Nếu bạn có những vật dụng không còn sử dụng, hãy quyên góp chúng
                cho những người cần: quần áo, sách vở, thực phẩm,...
              </p>
              <button className="text-white bg-green-600 px-4 py-2 rounded-full hover:bg-green-700 transition-all duration-300">
                Đăng Ký Góp Vật Dụng
              </button>
            </div>

            {/* Quyên Góp Thời Gian */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Image
                src={money}
                alt="Quyên góp thời gian"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Quyên Góp Thời Gian
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Dù bạn không thể quyên góp tiền bạc, nhưng thời gian và công sức
                của bạn sẽ là sự giúp đỡ quý báu đối với những hoàn cảnh khó
                khăn.
              </p>
              <button className="text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300">
                Tham Gia Tình Nguyện
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto py-12 px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Câu Chuyện Thành Công
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                “Cảm Ơn Bạn Đã Giúp Đỡ”
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                "Nhờ sự giúp đỡ của các bạn, tôi đã có cơ hội tiếp tục học và
                thay đổi cuộc sống. Cảm ơn các bạn đã mang lại hy vọng cho tôi!"
              </p>
              <p className="text-md text-gray-800">- Nguyễn Văn A</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                “Một Đổi Mới Thực Sự”
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                "Sự giúp đỡ của các bạn đã giúp chúng tôi xây dựng lại một
                trường học cho trẻ em nghèo. Cảm ơn vì đã giúp chúng tôi có một
                tương lai tươi sáng hơn!"
              </p>
              <p className="text-md text-gray-800">- Trần Thị B</p>
            </div>

            {/* Hiển thị thêm nếu showAllTestimonials là true */}
            {showAllTestimonials && (
              <>
                {/* Testimonial 3 */}
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    “Đổi Mới Cuộc Sống”
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    "Nhờ sự hỗ trợ từ các bạn, gia đình tôi đã có một mái ấm mới
                    và cuộc sống đã thay đổi tốt hơn rất nhiều."
                  </p>
                  <p className="text-md text-gray-800">- Lê Thị C</p>
                </div>

                {/* Testimonial 4 */}
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    “Sự Thay Đổi Diệu Kỳ”
                  </h3>
                  <p className="text-lg text-gray-600 mb-4">
                    "Sự giúp đỡ của các bạn đã giúp chúng tôi thoát khỏi khó
                    khăn và mở ra một cơ hội mới trong cuộc sống."
                  </p>
                  <p className="text-md text-gray-800">- Hoàng Văn D</p>
                </div>
              </>
            )}
          </div>

          {/* Nút "Xem Tất Cả" */}
          <div className="flex justify-center mt-8">
            <button
              onClick={toggleTestimonials}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all duration-300"
            >
              {showAllTestimonials ? "Thu Gọn" : "Xem Tất Cả"}
            </button>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-blue-600 text-white py-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Hãy Quyên Góp Ngay Hôm Nay
          </h2>
          <p className="text-lg px-20 mb-4">
            Mỗi đóng góp, dù nhỏ hay lớn, đều mang lại giá trị vô cùng lớn đối
            với những người cần sự giúp đỡ. Hãy giúp chúng tôi thay đổi cuộc
            sống của họ!
          </p>
          <button className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-full hover:bg-yellow-500">
            Đóng Góp Ở Đây
          </button>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto py-12 px-4 bg-gray-50">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Liên Hệ</h2>
          <p className="text-lg text-gray-700 mb-6">
            Nếu bạn có bất kỳ câu hỏi nào hoặc cần thêm thông tin, đừng ngần
            ngại liên hệ với chúng tôi. Chúng tôi luôn sẵn sàng giúp đỡ bạn.
          </p>
          <form className="max-w-lg mx-auto space-y-4">
            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
            />
            <textarea
              placeholder="Lời nhắn"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600"
            />
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
              Gửi Thông Tin
            </button>
          </form>
        </section>
      </div>
    </Container>
  );
};

export default DonatePage;
