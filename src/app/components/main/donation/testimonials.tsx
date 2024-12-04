"use client";
import React, { useState } from "react";

const Testimonials = () => {
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  const toggleTestimonials = () => {
    setShowAllTestimonials(!showAllTestimonials);
  };
  return (
    <div>
      {" "}
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
              "Nhờ sự giúp đỡ của các bạn, tôi đã có cơ hội tiếp tục học và thay
              đổi cuộc sống. Cảm ơn các bạn đã mang lại hy vọng cho tôi!"
            </p>
            <p className="text-md text-gray-800">- Nguyễn Văn A</p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              “Một Đổi Mới Thực Sự”
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              "Sự giúp đỡ của các bạn đã giúp chúng tôi xây dựng lại một trường
              học cho trẻ em nghèo. Cảm ơn vì đã giúp chúng tôi có một tương lai
              tươi sáng hơn!"
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
                  "Sự giúp đỡ của các bạn đã giúp chúng tôi thoát khỏi khó khăn
                  và mở ra một cơ hội mới trong cuộc sống."
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
    </div>
  );
};

export default Testimonials;
