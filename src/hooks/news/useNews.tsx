'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchPostListResponse, Filters } from '@/types/types';

const fetchNewsList = async (
  filters: Filters,
  pageParam: number = 1,
  token?: string,
): Promise<FetchPostListResponse> => {
  try {
    // lọc ra các giá trị không xác định hoặc trống từ các bộ lọc
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== '' && value !== null,
      ),
    );

    // Xây dựng chuỗi truy vấn
    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters, // hợp nhất các bộ lọc hợp lệ vào chuỗi truy vấn
    }).toString();

    // Thực hiện yêu cầu API bằng cách sử dụng Handle api
    const response = await handleAPI(
      `${endpoints.news}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null,
      token || null,
    );
    return response;
  } catch (error) {
    console.error('Error fetching news list:', error);
    throw error;
  }
};

// Hook tùy chỉnh để tìm nạp danh sách hàng đợi
const useNewsList = (
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

  return useQuery<FetchPostListResponse, Error>({
    queryKey: ['newsList', filters, page, token, refreshKey],
    queryFn: async () => fetchNewsList(filters, page, token || undefined),

    staleTime: 60000,
  });
};

export { useNewsList };
