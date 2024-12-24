'use client'; // This line ensures the component is treated as a Client Component

import { useForgotPassword, useGetVerifyCode } from '@/hooks/auth/usePassword';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [email, setEmail] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const { mutate: GetVerifyCode } = useGetVerifyCode();
  const { mutate: ForgotPassword } = useForgotPassword();
  const router = useRouter();

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Call API to send verification code
    GetVerifyCode({ email });
    setStep(2); // Go to the next step
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ForgotPassword({ email, new_password, code });
      router.push('/login'); // Navigate after successful password reset
    } catch (error) {
      console.error('Password reset failed', error);
    }
  };
  const isPasswordMatch = new_password === confirm_password;

  return (
    <div className="bg-white">
      <div className="min-h-max flex flex-col items-center justify-center py-6 px-4">
        <div className="border border-gray-300 bg-white shadow-lg rounded-lg p-6 max-w-md max-md:mx-auto">
          {step === 1 ? (
            // Form 1: Enter email to send verification code
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-28  font-bold">
                  Bạn quên mật khẩu?
                </h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một mã
                  xác minh để đặt lại mật khẩu.
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-14 mb-2 block">
                  Địa chỉ Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full text-sm text-black border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Nhập địa chỉ email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-primary-500 hover:bg-blue-700 focus:outline-none"
                >
                  Gửi mã xác minh
                </button>
              </div>
            </form>
          ) : (
            // Form 2: Enter code and new password to reset
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="mb-8">
                <h3 className="text-gray-800 text-26 font-bold">
                  Đặt lại mật khẩu của bạn
                </h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Nhập mã xác minh mà chúng tôi đã gửi đến email của bạn và mật
                  khẩu mới của bạn
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Mã xác minh
                </label>
                <input
                  type="text"
                  required
                  className="w-full text-sm text-black border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Nhập mã xác minh"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  required
                  className="w-full text-sm text-black border border-gray-300 px-4 py-3 rounded-lg outline-blue-600"
                  placeholder="Nhập mật khẩu mới"
                  value={new_password}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Xác nhận Mật Khẩu Mới
                </label>
                <input
                  type="password"
                  required
                  className={`w-full text-sm text-black border px-4 py-3 rounded-lg outline-blue-600 ${
                    !isPasswordMatch ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm new password"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-primary-500 hover:bg-blue-700 focus:outline-none"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
