'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchMissionListResponse, Filters } from '@/types/types';

const fetchMissionlist = async (
  filters: Filters,
  pageParam: number = 1,
  token?: string,
): Promise<FetchMissionListResponse> => {
  try {
    // Loại bỏ các giá trị undefined, null hoặc rỗng trong filters
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== '' && value !== null,
      ),
    );

    // Loại bỏ category nếu nó không có giá trị hợp lệ
    if (!validFilters.category) {
      delete validFilters.category; // Xóa category nếu không có giá trị hợp lệ
    }

    // Tạo query string từ các filters hợp lệ
    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters, // Thêm các bộ lọc hợp lệ
    }).toString();

    // Make the API request using handleAPI
    const response = await handleAPI(
      `${endpoints.missions}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null,
      token || null,
    );
    return response;
  } catch (error) {
    console.error('Error fetching blogs list:', error);
    throw error; // Rethrow error for further handling
  }
};

// Custom hook for fetching the queue list
const useMissionList = (
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
    queryKey: ['missionList', filters, page, token, refreshKey], // Thêm refreshKey vào queryKey
    queryFn: async () => {
      return fetchMissionlist(filters, page, token || undefined);
    },
    staleTime: 60000,
  });
};

export { useMissionList };
