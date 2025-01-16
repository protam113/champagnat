import React from 'react';
import { FaCross } from 'react-icons/fa'; // Icon thánh giá

const NotiPostNull = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <FaCross className="text-6xl text-gray-500 mb-4" />
      <p className="text-gray-700 text-lg">
        Hiện tại không có bài viết. Vui lòng quay lại sau.
      </p>
    </div>
  );
};

export default NotiPostNull;
