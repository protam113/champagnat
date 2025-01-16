'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchMessageListResponse } from '@/types/types';
/*
        Hooks lấy danh sách in nhắn
    */
const fetchMessageList = async (
  pageParam: number = 1,
  token?: string,
): Promise<FetchMessageListResponse> => {
  try {
    const queryString = new URLSearchParams({
      page: pageParam.toString(),
    }).toString();

    const response = await handleAPI(
      `${endpoints.messages}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null,
      token || null,
    );
    return response;
  } catch (error) {
    console.error('Error fetching message list:', error);
    throw error;
  }
};

const useMessageList = (page: number, refreshKey: number) => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken);
    };

    fetchToken();
  }, [getToken]);

  return useQuery<FetchMessageListResponse, Error>({
    queryKey: ['messageList', page, token, refreshKey],
    queryFn: async () => fetchMessageList(page, token || undefined),

    staleTime: 60000,
  });
};

export { useMessageList };
