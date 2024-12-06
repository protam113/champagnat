'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { message } from 'antd';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/authContext';

interface NewEventRegister {
  first_name: string;
  phone_number: string;
  email: string;
  last_name: string;
  image?: string | File | null;
  brothers_and_sisters_year: string | null;
  confirmation_at: string | null;
  pardoner: string | null;
  dad_first_name: string | null;
  dad_last_name: string | null;
  mom_last_name: string | null;
  mom_first_name: string | null;
  brothers_and_sisters_name: string | null;
  baptism_day_form: string | null;
  confirmation_mass: string | null;
  baptism_day: string | null;
  dob: Date | null;
  parish_hometown: string | null;
  confirmation_form: string | null;
  learning_process: string | null;
  religious_vocation_id: string | null;
  first_communion_day: Date | null;
  baptismal_sponsor: string | null;
  baptismal_at: string | null;
  location: string | null;
  confirmation_sponsor: string | null;
}

const CreateEventRegistion = async (
  newRegister: NewEventRegister,
  eventId: string,
  token?: string,
) => {
  const formData = new FormData();

  // Duyệt qua các thuộc tính của `newRegister` và xử lý
  for (const key in newRegister) {
    const value = newRegister[key as keyof NewEventRegister];

    if (key === 'image') {
      if (typeof value === 'string') {
        // Nếu là URL hình ảnh
        formData.append(key, value);
      } else if (value instanceof File) {
        // Nếu là file tải lên
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        // Nếu là mảng hình ảnh tải lên
        value.forEach((file) => {
          formData.append('image', file);
        });
      }
    } else if (value === null) {
      // Nếu giá trị là null, không gửi trường này trong FormData
      // Nếu cần có thể gửi 'null' hoặc chuỗi trống tùy vào backend yêu cầu
      formData.append(key, 'null'); // Hoặc có thể bỏ qua không gửi gì
    } else if (value) {
      // Thêm các trường có giá trị khác vào FormData
      formData.append(key, value as string);
    }
  }

  try {
    // Gửi FormData tới backend
    const response = await handleAPI(
      `${endpoints.eventRegister.replace(':id', eventId)}`,
      'POST',
      formData,
      token || null,
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating event registration:', error.response?.data);
    throw new Error(
      error.response?.data?.message || 'Failed to create event registration',
    );
  }
};

const useEventRegistion = (eventId: string) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken);
    };
    fetchToken();
  }, [getToken]);

  return useMutation({
    mutationFn: async (newBlog: NewEventRegister) => {
      return CreateEventRegistion(newBlog, eventId, token || undefined);
    },
    onSuccess: () => {
      message.success('Bạn đã đăng ký thêm thành công');
      queryClient.invalidateQueries({ queryKey: ['eventRegisterList'] });
    },
    onError: (error) => {
      console.log(error.message || 'Failed to create event.');
    },
  });
};

export { useEventRegistion };
