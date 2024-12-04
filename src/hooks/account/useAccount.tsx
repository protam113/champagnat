'use client';

import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';

interface Register {
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: number;
}

const validateInputs = (register: Register) => {
  const { username, password, email, first_name, last_name, phone_number } =
    register;

  if (!username) return 'Vui lòng nhập tên đăng nhập.';
  if (!password) return 'Vui lòng nhập mật khẩu.';
  if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    return 'Vui lòng nhập email hợp lệ.';
  }
  if (!first_name) return 'Vui lòng nhập họ.';
  if (!last_name) return 'Vui lòng nhập tên.';
  if (!phone_number) return 'Vui lòng nhập số điện thoại.';
  return null;
};

const registerUser = async (register: Register) => {
  const errorMessage = validateInputs(register);
  if (errorMessage) {
    message.error(errorMessage); // Hiển thị lỗi cho người dùng
    return;
  }

  // Tạo FormData sau khi tất cả dữ liệu đã hợp lệ
  const formData = new FormData();
  for (const key in register) {
    if (Object.prototype.hasOwnProperty.call(register, key)) {
      const value = register[key as keyof Register];
      if (typeof value === 'string' || typeof value === 'number') {
        formData.append(key, value.toString());
      }
    }
  }

  try {
    const response = await handleAPI(`${endpoints.register}`, 'POST', formData);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error registering user:',
      error.response?.data || error.message,
    );
    throw error;
  }
};

const useRegister = () => {
  return useMutation({
    mutationFn: async (registrationData: Register) => {
      return registerUser(registrationData);
    },
    onSuccess: () => {
      message.success('Đăng ký thành công vui lòng đợi duyệt!');
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        'Đăng ký không thành công.';
      message.warning(errorMessage);
    },
  });
};

export { useRegister };
