'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchEventListResponse, Filters } from '@/types/types';

const fetchEventList = async (
  filters: Filters,
  pageParam: number = 1,
  token?: string,
): Promise<FetchEventListResponse> => {
  try {
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== '',
      ),
    );

    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters,
    }).toString();

    const response = await handleAPI(
      `${endpoints.events}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null,
      token || null,
    );
    return response;
  } catch (error) {
    console.error('Error fetching event list:', error);
    throw error;
  }
};

const useEventList = (
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

  return useQuery<FetchEventListResponse, Error>({
    queryKey: ['eventList', filters, page, token, refreshKey], // Thêm refreshKey vào queryKey
    queryFn: async () => {
      if (!token) {
        throw new Error('Token is not available');
      }
      return fetchEventList(filters, page, token || undefined);
    },
    staleTime: 60000,
  });
};

export { useEventList };
