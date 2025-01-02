'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';

/**
 Tạo visit
 **/

const CreateVisit = async (token?: string) => {
  try {
    // Gửi FormData tới backend
    const response = await handleAPI(
      `${endpoints.visit}`,
      'POST',
      null,
      token || null,
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating blog:', error.response?.data);
  }
};

const useCreateVisit = () => {
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
    mutationFn: async () => {
      return CreateVisit(token || undefined);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitList'] });
    },
    onError: (error) => {
      console.log(error.message || 'Failed to create comment.');
    },
  });
};

export { useCreateVisit };
