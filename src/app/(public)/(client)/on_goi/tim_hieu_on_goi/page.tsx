'use client';
import { HistoryContent } from '@/components/animate/scroll/TextParallaxContent';
import RichText from '@/components/design/richText/EventRichText';
import { useState } from 'react';
import { DatePicker } from 'antd'; // Import DatePicker from antd
import { useApplyVocation } from '@/hooks/vocation/useVocation';
import moment from 'moment'; // Import moment to format the date

const Page = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [church, setChurch] = useState('');
  const [reason, setReason] = useState('');
  const [dob, setDob] = useState<string>(''); // Khởi tạo dob là chuỗi rỗng

  const { mutate } = useApplyVocation(); // Assuming this function sends the form data

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDob = dob ? moment(dob).format('YYYY-MM-DD') : '';
    // Here, you can send the form data to an API or perform other actions
    const formData = {
      name,
      email,
      phone_number: phoneNumber,
      church,
      dob: formattedDob,
      reason,
    };

    mutate(formData); // Assuming mutate will handle the form submission
  };

  return (
    <div className=" py-10">
      <HistoryContent category="5fd97bd4-0f02-42f0-9674-71c4ef59c6a5" />
      <div className="max-w-4xl mx-auto bg-primary-500 text-white p-8 rounded-lg shadow-lg">
        <div className="text-center pb-6">
          <h2 className="text-2xl text-white font-bold text-gray-800">
            Thông Tin Liên Hệ
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-white text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Họ Và Tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nhập họ và tên"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                className="block text-white text-sm font-medium text-gray-700"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm text-white font-medium text-gray-700"
                htmlFor="phone_number"
              >
                Điện Thoại
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                placeholder="Nhập số điện thoại"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                className="block text-white text-sm font-medium text-gray-700"
                htmlFor="church"
              >
                Giáo Xứ / Giáo Phận
              </label>
              <input
                type="text"
                id="church"
                name="church"
                placeholder="Nhập tên giáo xứ / giáo phận"
                required
                value={church}
                onChange={(e) => setChurch(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              className="block text-16 text-white font-medium mb-1"
              htmlFor="dob"
            >
              Ngày Sinh
            </label>
            <DatePicker
              id="dob"
              name="dob"
              value={dob}
              onChange={(date) => setDob(date)} // Cập nhật giá trị dob
              className="w-max px-4 py-4s bg-white text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              format="DD/MM/YYYY" // Định dạng ngày tháng
            />
          </div>
          {/* Reason Section */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="messages"
            >
              Nội Dung
            </label>
            <div className="bg-white text-black p-4 border border-gray-300 rounded-lg">
              <RichText onChange={setReason} initialContent={reason} />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-sm font-semibold py-2 px-4 bg-primary-600 text-white rounded-lg transition-colors duration-300 hover:bg-yellow-500"
            >
              Gửi Liên Hệ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
