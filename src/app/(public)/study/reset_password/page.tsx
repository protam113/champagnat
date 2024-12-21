'use client';

import { useState } from 'react';
import { PiEyeSlash } from 'react-icons/pi';
import { RxEyeOpen } from 'react-icons/rx';
import { useRouter } from 'next/navigation';
import { useChangePassword } from '@/hooks/auth/usePassword'; // Giả sử bạn đã có hook để thay đổi mật khẩu
import Heading from '@/components/design/Heading';

const Page = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { mutate } = useChangePassword(); // Giả sử bạn đã có hook để xử lý cập nhật mật khẩu

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

    // Tạo đối tượng passwordData để gửi đi
    const passwordData = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    try {
      // Gọi API để thay đổi mật khẩu
      await mutate(passwordData);

      // Sau khi đổi mật khẩu thành công, chuyển hướng đến trang đăng nhập
      alert('Mật khẩu đã được đổi thành công.');
      router.push('/login');
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Đổi mật khẩu thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="flex items-center justify-center py-2">
      <div className="w-full max-w-md p-4">
        {/* Tiêu đề */}
        <Heading name="Đổi mật khẩu" />

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

export default Page;
