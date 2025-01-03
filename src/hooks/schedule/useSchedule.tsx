import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { ScheduleList, Filters } from '@/types/types';

// Hàm fetch dữ liệu lịch
const fetchScheduleList = async (
  filters: Filters,
  token?: string,
): Promise<ScheduleList> => {
  try {
    // Lọc bỏ các giá trị không hợp lệ
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([value]) => value !== undefined && value !== '', // Bỏ qua key
      ),
    );

    // Chuyển các giá trị thành chuỗi cho URLSearchParams
    const stringifiedFilters = Object.fromEntries(
      Object.entries(validFilters).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(',') : String(value),
      ]),
    );

    // Tạo chuỗi query
    const queryString = new URLSearchParams(stringifiedFilters).toString();

    // Gọi API
    const response = await handleAPI(
      `${endpoints.schedules}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null,
      token || null,
    );

    return response;
  } catch (error) {
    console.error('Error fetching schedule list:', error);
    throw error;
  }
};

// Custom hook để lấy dữ liệu lịch
const useScheduleList = (filters: Filters = {}, refreshKey: number) => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken);
    };
    fetchToken();
  }, [getToken]);

  return useQuery<ScheduleList, Error>({
    queryKey: ['scheduleList', token, filters, refreshKey],
    queryFn: async () => {
      return fetchScheduleList(filters, token || undefined);
    },
    staleTime: 60000,
  });
};

export { useScheduleList };
