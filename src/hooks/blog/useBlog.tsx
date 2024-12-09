'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchPostListResponse, Filters } from '@/types/types';

const fetchBlogList = async (
  filters: Filters,
  pageParam: number = 1,
  token?: string,
): Promise<FetchPostListResponse> => {
  try {
    // Lọc bỏ các giá trị không xác định hoặc rỗng từ bộ lọc
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== '' && value !== null,
      ),
    );

    // Xây dựng chuỗi truy vấn
    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters,
    }).toString();
    // Thực hiện yêu cầu API bằng cách sử dụng API xử lý
    const response = await handleAPI(
      `${endpoints.blogs}${queryString ? `?${queryString}` : ''}`,
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

// Hook tùy chỉnh để lấy danh sách hàng đợi
const useBlogsList = (
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
    queryKey: ['blogList', filters, page, token, refreshKey],
    queryFn: async () => fetchBlogList(filters, page, token || undefined),

    staleTime: 60000,
  });
};

export { useBlogsList };
