'use client';

import { useQueryClient, useMutation } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { ApplyVocationData } from '@/types/types';

const ApplyVocation = async (
  applyVocation: ApplyVocationData,
  token?: string,
) => {
  const formData = new FormData();

  // Duyệt qua các thuộc tính của `newBlog` và xử lý
  for (const key in applyVocation) {
    const value = applyVocation[key as keyof ApplyVocationData];

    if (value) {
      formData.append(key, value as string);
    }
  }

  try {
    // Gửi FormData tới backend
    const response = await handleAPI(
      `${endpoints.vocation}`,
      'POST',
      formData,
      token || null,
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating blog:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to create blog');
  }
};

const useApplyVocation = () => {
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
    mutationFn: async (applyVocation: ApplyVocationData) => {
      return ApplyVocation(applyVocation, token || undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vocationList'] });
    },
    onError: (error) => {
      console.error(error.message || 'Failed to create comment.');
    },
  });
};

export { useApplyVocation };
