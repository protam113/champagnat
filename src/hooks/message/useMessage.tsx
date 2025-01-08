'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchMissionListResponse, Filters } from '@/types/types';
/*
        Hooks lấy danh sách tin nhắn
    */
const fetchMessageList = async (
  filters: Filters,
  pageParam: number = 1,
  token?: string,
): Promise<FetchMissionListResponse> => {
  try {
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== null && value !== undefined,
      ),
    );

    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters,
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

const useMessageList = (
  page: number,
  filters: Filters = {},
  refreshKey: number,
) => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken);
    };

    fetchToken();
  }, [getToken]);

  return useQuery<FetchMissionListResponse, Error>({
    queryKey: ['messageList', filters, page, token, refreshKey],
    queryFn: async () => fetchMessageList(filters, page, token || undefined),

    staleTime: 60000,
  });
};

export { useMessageList };
