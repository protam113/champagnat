import React from "react";
import Container from "../../Container/container";

const Newsletter = () => {
  return (
    <Container>
      {" "}
      <div className="mt-12 p-6 bg-primary-500 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Đăng ký nhận bản tin</h2>
        <p className="mt-4 text-sm">
          Nhận thông báo về các bài viết mới nhất và cập nhật blog!
        </p>
        <div className="mt-4 flex">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="px-4 py-2 rounded-l-lg w-full text-black focus:outline-none"
          />
          <button className="px-4 py-4 bg-yellow-400 text-gray-700 rounded-r-lg hover:bg-yellow-500 hover:text-white">
            Gửi
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Newsletter;
