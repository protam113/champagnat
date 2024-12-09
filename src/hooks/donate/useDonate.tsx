'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchPostListResponse, Filters } from '@/types/types';

const fetchDonateList = async (
  filters: Filters,
  pageParam: number = 1,
  token?: string,
): Promise<FetchPostListResponse> => {
  try {
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== '' && value !== null,
      ),
    );

    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters,
    }).toString();

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

const useDonateList = (
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
    queryKey: ['donateList', filters, page, token, refreshKey],
    queryFn: async () => fetchDonateList(filters, page, token || undefined),

    staleTime: 60000,
  });
};

export { useDonateList };
