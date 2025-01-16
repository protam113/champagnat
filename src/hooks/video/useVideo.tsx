'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchMediaVideoResponse } from '@/types/types';

/*
        Hooks lấy danh sách tài liệu
    */

const fetchVideoList = async (
  pageParam: number = 1,
  token?: string,
): Promise<FetchMediaVideoResponse> => {
  try {
    const queryString = new URLSearchParams({
      page: pageParam.toString(),
    }).toString();

    const response = await handleAPI(
      `${endpoints.video}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null,
      token || null,
    );

    // Đảm bảo trả về đúng cấu trúc mà VideoList sử dụng
    return {
      data: response, // Giả sử API trả về mảng trực tiếp, không cần dùng `data` nếu API trả về mảng
    };
  } catch (error) {
    console.error('Error fetching gallery list:', error);
    throw error;
  }
};

// Custom hook for fetching the queue list
const useVideoList = (page: number, refreshKey: number) => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken);
    };

    fetchToken();
  }, [getToken]);

  return useQuery<FetchMediaVideoResponse, Error>({
    queryKey: ['videoList', page, token, refreshKey],
    queryFn: async () => {
      return fetchVideoList(page, token || undefined);
    },

    staleTime: 60000,
  });
};

export { useVideoList };
