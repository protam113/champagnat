import React, { useState } from 'react';
import 'animate.css';
import Tittle from '../../design/Tittle';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Câu hỏi 1: Tôi có thể quyên góp như thế nào cho nhà dòng?',
      answer:
        'Bạn có thể quyên góp qua chuyển khoản ngân hàng hoặc trực tiếp đến nhà dòng. Mọi đóng góp đều rất quý giá và giúp đỡ chúng tôi duy trì hoạt động.',
    },
    {
      question: 'Câu hỏi 2: Có thể quyên góp hàng hóa không?',
      answer:
        'Ngoài tiền mặt, bạn cũng có thể quyên góp thực phẩm, đồ dùng thiết yếu cho nhà dòng. Vui lòng liên hệ trực tiếp để biết thêm chi tiết.',
    },
    {
      question: 'Câu hỏi 3: Mọi khoản quyên góp sẽ được sử dụng như thế nào?',
      answer:
        'Tất cả các khoản quyên góp đều được sử dụng cho các hoạt động của nhà dòng, bao gồm hỗ trợ các chương trình từ thiện, duy trì cơ sở vật chất và giúp đỡ cộng đồng.',
    },
    {
      question:
        'Câu hỏi 4: Tôi có thể nhận biên lai cho khoản quyên góp của mình không?',
      answer:
        'Có, bạn sẽ nhận được biên lai cho mọi khoản quyên góp của mình để sử dụng cho mục đích thuế hoặc báo cáo tài chính.',
    },
    {
      question: 'Câu hỏi 5: Quyên góp trực tuyến có an toàn không?',
      answer:
        'Chúng tôi cam kết bảo mật thông tin cá nhân và tài chính của bạn khi thực hiện các khoản quyên góp trực tuyến qua cổng thanh toán bảo mật.',
    },
  ];

  const toggleAnswer = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto pt-20 rounded-lg ">
      <h1 className="text-center mb-6 text-gray-800">
        <Tittle name="CÂU HỎI THƯỜNG GẶP (FAQ)" />
      </h1>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-6">
          <div
            onClick={() => toggleAnswer(index)}
            className="cursor-pointer p-4 bg-primary-500 rounded-lg shadow-md text-white hover:scale-105 transform transition-all duration-300 ease-in-out"
          >
            <h2 className="text-16 font-medium">{faq.question}</h2>
          </div>
          {activeIndex === index && (
            <div className="animate__animated animate__fadeInDown animate__fast p-4 mt-2 bg-white rounded-lg shadow-md text-gray-700">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
