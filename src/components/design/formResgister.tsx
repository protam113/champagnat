// src/components/Contact.tsx
import React from 'react';
import { message } from 'antd';
import Container from '../Container/container';

const Contact = () => {
  const onSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('access_key', '9c07ff66-d3ac-4585-a5f2-22c1b73c3f77');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        message.success('Form Submitted Successfully');
        event.target.reset();
      } else {
        message.error('Form Submission Failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('An error occurred while submitting the form.');
    }
  };

  return (
    <Container>
      <div
        className="contact p-6 bg-primary-500 rounded-lg shadow-md max-w-4xl mx-auto my-10"
        data-aos="fade-up"
      >
        <div className="text-center pb-5">
          <h2 className="text-24 text-white font-bold">Thông Tin Liên Hệ</h2>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6"
        >
          {/* Left Section: Three Fields */}
          <div className="flex-1 flex flex-col space-y-4">
            <div>
              <label className="block text-white mb-1" htmlFor="name">
                Họ Và Tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nhập họ và tên"
                required
                className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label
                className="block text-white font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập địa chỉ email"
                required
                className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label
                className="block text-white font-medium mb-1"
                htmlFor="phone"
              >
                Điện Thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại"
                required
                className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>

          {/* Right Section: Message Field */}
          <div className="flex-1 flex flex-col space-y-4">
            <div>
              <label
                className="block text-white font-medium mb-1"
                htmlFor="messages"
              >
                Nội Dung
              </label>
              <textarea
                id="messages"
                name="messages"
                placeholder="Nội dung liên hệ"
                required
                className="w-full px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 h-40 resize-none"
              ></textarea>
            </div>
            <div className="self-start">
              <button
                type="submit"
                className="relative inline-block text-lg group"
              >
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                  <span className="relative">Gửi Liên Hệ</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Contact;
