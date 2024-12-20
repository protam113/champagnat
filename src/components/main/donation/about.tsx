import React from "react";

const About = () => {
  return (
    <div>
      <section className="container mx-auto py-16 px-6 lg:px-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center tracking-wide uppercase">
          Về Chúng Tôi
        </h2>
        <div className="space-y-6 text-lg text-gray-700 max-w-3xl mx-auto">
          <p className="transition-all duration-300 transform hover:scale-105">
            Tổ chức của chúng tôi luôn nỗ lực hỗ trợ cộng đồng gặp khó khăn, từ
            việc cung cấp học bổng cho học sinh nghèo đến việc xây dựng cơ sở hạ
            tầng và chăm sóc sức khỏe cho những người cần giúp đỡ.
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
    </div>
  );
};

export default About;
