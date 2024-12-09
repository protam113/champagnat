'use client';

import { useState } from 'react';
import { PiEyeSlash } from 'react-icons/pi';
import { RxEyeOpen } from 'react-icons/rx';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu có khớp không
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      return;
    }

    // Logic xử lý đổi mật khẩu ở đây
    try {
      // Ví dụ gọi API đổi mật khẩu
      alert('Mật khẩu đã được đổi thành công.');
      router.push('/login'); // Sau khi đổi mật khẩu, chuyển hướng đến trang đăng nhập
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Đổi mật khẩu thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className=" flex items-center justify-center  py-2">
      <div className="w-full max-w-md  p-4">
        {/* Tiêu đề */}
        <h2 className="text-2xl font-semibold text-center mb-8">
          Đổi Mật Khẩu
        </h2>

        {/* Hiển thị thông báo lỗi nếu có */}
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Mật khẩu cũ */}
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-sm text-gray-600 mb-2"
            >
              Mật khẩu cũ:
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Nhập mật khẩu cũ"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 top-10"
            >
              {showPassword ? (
                <PiEyeSlash className="h-5 w-5 text-gray-600" />
              ) : (
                <RxEyeOpen className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mật khẩu mới */}
          <div className="mb-4 relative">
            <label
              htmlFor="newPassword"
              className="block text-sm text-gray-600 mb-2"
            >
              Mật khẩu mới:
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Nhập mật khẩu mới"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 top-10"
            >
              {showPassword ? (
                <PiEyeSlash className="h-5 w-5 text-gray-600" />
              ) : (
                <RxEyeOpen className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div className="mb-6 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm text-gray-600 mb-2"
            >
              Xác nhận mật khẩu mới:
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Nhập lại mật khẩu mới"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-2 top-10"
            >
              {showPassword ? (
                <PiEyeSlash className="h-5 w-5 text-gray-600" />
              ) : (
                <RxEyeOpen className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Nút đổi mật khẩu */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
