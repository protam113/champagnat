'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/assets/image/logo.png';
import Image from 'next/image';
import { PiEyeSlash } from 'react-icons/pi';
import { RxEyeOpen } from 'react-icons/rx';

import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import Loading from '@/components/design/Loading';

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Chỉnh sửa tên biến để đồng nhất
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Bật loading khi bắt đầu đăng nhập
    try {
      await login(username, password);
      router.push('/'); // Điều hướng tới trang Dashboard sau khi đăng nhập thành công
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false); // Tắt loading khi kết thúc
    }
  };

  if (loading)
    return (
      <div className="w-full h-full">
        <Loading />
      </div>
    );
  return (
    <div className="min-h-full flex items-center justify-center pt-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="logo" height={90} width={150} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-600 mb-2">
              Tên đăng nhập:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Nhập email của bạn"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm text-gray-600 mb-2"
            >
              Mật khẩu:
            </label>
            <input
              type={showPassword ? 'text' : 'password'} // Sử dụng showPassword để quyết định type
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Nhập mật khẩu của bạn"
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

          <button
            type="submit"
            className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-indigo-500 hover:underline">
              Đăng ký ngay
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link href={'/reset'} className="text-indigo-500 hover:underline">
              Quên mật khẩu
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
