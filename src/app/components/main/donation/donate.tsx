import Image from "next/image";
import React from "react";
import money from "@/assets/image/banner.png";
const Donate = () => {
  return (
    <div>
      {" "}
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
              của bạn sẽ là sự giúp đỡ quý báu đối với những hoàn cảnh khó khăn.
            </p>
            <button className="text-white bg-blue-600 px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300">
              Tham Gia Tình Nguyện
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
