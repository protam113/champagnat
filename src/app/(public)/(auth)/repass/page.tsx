'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/assets/image/logo.png';
import Image from 'next/image';
import { PiEyeSlash } from 'react-icons/pi';
import { RxEyeOpen } from 'react-icons/rx';
import { useRouter } from 'next/navigation';

// Hàm kiểm tra email hợp lệ
const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

const RecoverPassPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSendVerificationCode = async () => {
    if (!email) {
      setError('Vui lòng nhập email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email không hợp lệ');
      return;
    }

    try {
      // Giả sử mã xác nhận đã được gửi thành công
      const code = Math.floor(100000 + Math.random() * 900000); // Mã xác nhận giả
      console.log(`Mã xác nhận đã được gửi đến email: ${code}`);

      setIsEmailSent(true);
      setError('');
    } catch (error) {
      console.error('Error sending verification code:', error);
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (verificationCode !== '123456') {
      // Giả sử mã xác nhận là '123456'
      setError('Mã xác nhận không đúng');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }

    try {
      // Gọi API để thay đổi mật khẩu
      console.log('Mật khẩu đã được thay đổi');
      router.push('/login'); // Điều hướng về trang đăng nhập sau khi thay đổi mật khẩu thành công
    } catch (error) {
      console.error('Error:', error);
      setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center pt-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="logo" height={90} width={150} />
        </div>

        {!isEmailSent ? (
          <div>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-14 text-gray-600 mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleSendVerificationCode}
                className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition duration-200"
              >
                Gửi mã xác nhận
              </button>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="verificationCode"
                  className="block text-14 text-gray-600 mb-2"
                >
                  Mã xác nhận đã gửi:
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                  placeholder="Nhập mã xác nhận"
                  required
                />
              </div>
              <div className="mb-6 relative">
                <label
                  htmlFor="password"
                  className="block text-14 text-gray-600 mb-2"
                >
                  Mật khẩu mới:
                </label>
                <input
                  type={showPassword ? 'text' : 'password'} // Sử dụng showPassword để quyết định type
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
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

              <div className="mb-6 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-14 text-gray-600 mb-2"
                >
                  Xác nhận mật khẩu:
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                  placeholder="Xác nhận mật khẩu mới"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute right-2 top-10"
                >
                  {showConfirmPassword ? (
                    <PiEyeSlash className="h-5 w-5 text-gray-600" />
                  ) : (
                    <RxEyeOpen className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition duration-200"
              >
                Lưu mật khẩu
              </button>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-14 text-gray-600">
            <Link href="/login" className="text-indigo-500 hover:underline">
              Quay lại đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassPage;
