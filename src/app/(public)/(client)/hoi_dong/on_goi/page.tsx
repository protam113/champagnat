import Container from '@/app/components/Container/container';
import Breadcrumb from '@/app/components/design/BreackCumb';
import Link from 'next/link';
import React from 'react';

const OnGoiPage = () => {
  return (
    <Container>
      <div className="py-10">
        {/* Header Section */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-primary-900">
            Khám phá Ơn Gọi
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Chúng tôi mời bạn cùng khám phá hành trình ơn gọi của mình và tìm
            thấy mục đích trong cuộc sống.
          </p>
          <div className="text-14  text-gray-500 mt-2">
            <Breadcrumb />
          </div>
        </header>

        {/* About Section */}
        <section className="container mx-auto py-12 px-4">
          <h2 className="text-20 font-semibold text-gray-800 mb-6">
            Về Ơn Gọi
          </h2>
          <p className="text-16 ttext-neutral-900 mb-6">
            Ơn gọi không chỉ là một lời mời, mà là một sứ mệnh. Đây là hành
            trình khám phá những khả năng tiềm ẩn của bản thân và sống theo mục
            đích của mình. Dù bạn đang tìm kiếm một công việc, một con đường tôn
            giáo, hay đơn giản chỉ là một ý nghĩa cuộc sống, chúng tôi sẽ đồng
            hành cùng bạn trong suốt quá trình này.
          </p>
          <p className="text-15 text-neutral-900">
            Trong cuộc sống, mỗi người đều có những ơn gọi riêng biệt, được gọi
            để trở thành một phần của một cộng đồng, một mục tiêu lớn hơn. Trang
            này được thiết kế để cung cấp các thông tin hữu ích, giúp bạn khám
            phá và phát triển ơn gọi của mình.
          </p>
        </section>

        {/* Programs Section */}
        <section className="bg-gray-100 py-12 px-4">
          <h2 className="text-24 font-semibold text-gray-800 mb-6">
            Các Chương Trình Ơn Gọi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                Chương Trình Đào Tạo Ơn Gọi
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Tham gia chương trình đào tạo để hiểu rõ hơn về ơn gọi của mình
                và cách thức để phát triển trong cuộc sống.
              </p>
              <button className="text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700">
                Tìm Hiểu Thêm
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto py-12 px-4">
          <h2 className="text-24 font-semibold text-gray-800 mb-6">
            Câu Hỏi Thường Gặp
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-18 font-semibold text-gray-800 mb-4">
                Ơn gọi là gì?
              </h3>
              <p className="text-16 text-gray-600">
                Ơn gọi là một sự nhận thức và khám phá bản thân để hiểu rõ mục
                đích trong cuộc sống, có thể là trong công việc, cuộc sống gia
                đình, hoặc trong sự phục vụ cộng đồng.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-18 font-semibold text-gray-800 mb-4">
                Làm thế nào để tôi biết được ơn gọi của mình?
              </h3>
              <p className="text-16 text-gray-600">
                Quá trình khám phá ơn gọi là một hành trình cá nhân. Bạn có thể
                tham gia các chương trình đào tạo, tọa đàm chia sẻ, hoặc tự mình
                suy ngẫm và khám phá qua việc tham gia các hoạt động thực tế.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-18 font-semibold text-gray-800 mb-4">
                Tôi cần chuẩn bị gì trước khi tham gia chương trình?
              </h3>
              <p className="text-16 text-gray-600">
                Trước khi tham gia, bạn nên chuẩn bị một tâm thế mở, sẵn sàng
                học hỏi và khám phá những điều mới. Đừng ngần ngại đặt câu hỏi
                và chia sẻ suy nghĩ của mình.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-blue-600 text-white py-12 text-center">
          <h2 className="text-18 font-semibold mb-4">
            Sẵn Sàng Khám Phá Ơn Gọi Của Bạn?
          </h2>
          <p className="text-16 mb-4">
            Hãy tham gia các chương trình của chúng tôi để bắt đầu hành trình
            khám phá ơn gọi của bạn ngay hôm nay!
          </p>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            />
            <textarea
              placeholder="Lời nhắn của bạn"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
            >
              Gửi Liên Hệ
            </button>
          </form>
        </section>
      </div>
    </Container>
  );
};

export default OnGoiPage;
