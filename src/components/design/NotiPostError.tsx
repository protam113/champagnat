import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const NotiPostError = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <FaExclamationCircle className="text-6xl text-red-500 mb-4" />{' '}
      {/* Icon cảnh báo */}
      <p className="text-center text-red-500 text-lg">
        Ôi, có một chút sự cố! Chúng tôi không thể tải dữ liệu vào lúc này.
        <br />
        Vui lòng thử lại sau hoặc quay lại sau nhé. Chúng tôi xin lỗi vì sự bất
        tiện này!
      </p>
    </div>
  );
};

export default NotiPostError;
