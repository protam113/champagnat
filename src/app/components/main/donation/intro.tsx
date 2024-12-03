import Image from "next/image";
import Link from "next/link";
import React from "react";
import money from "@/assets/image/banner.png";
import Heading from "../../design/Heading";
import Breadcrumb from "../../design/BreackCumb";
const Intro = () => {
  return (
    <div>
      <div className="mb-16">
        <div className="text-center">
          <Heading name="Quyên góp cho những mục tiêu tốt đẹp" />
          <Breadcrumb />
        </div>

        {/* Văn bản mô tả thêm về cảm hứng và ý nghĩa quyên góp */}
        <div className="pt-10 space-y-6 text-lg text-gray-700 max-w-3xl mx-auto">
          <p className="transition-all duration-300 transform hover:scale-105">
            "Mỗi hành động của bạn là một phần tạo dựng nên niềm hy vọng, một
            câu chuyện mới bắt đầu, và một bước đi vững chắc trên con đường thay
            đổi thế giới."
          </p>
          <p className="transition-all duration-300 transform hover:scale-105">
            Tổ chức của chúng tôi luôn nỗ lực hỗ trợ cộng đồng gặp khó khăn, từ
            việc cung cấp học bổng cho học sinh nghèo đến việc xây dựng cơ sở hạ
            tầng và chăm sóc sức khỏe cho những người cần giúp đỡ. Chúng tôi tin
            rằng những hành động nhỏ, những đóng góp giản dị sẽ tạo nên sự khác
            biệt lớn lao trong cuộc sống của người khác.
          </p>
          {/* Thêm câu chuyện cảm hứng */}
          <p className="font-semibold text-lg text-primary-600 mt-4">
            Cùng chung tay, bạn có thể là người thay đổi số phận của một ai đó!
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
      </div>
    </div>
  );
};

export default Intro;
