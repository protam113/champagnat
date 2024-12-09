'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchGroupListResponse, Filters } from '@/types/types';

const fetchGrouplist = async (
  pageParam: number = 1,
  token: string,
  filters: Filters,
): Promise<FetchGroupListResponse> => {
  if (!token) {
    throw new Error('No token provided');
  }

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
      `${endpoints.groups}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null,
      token,
    );
    return response;
  } catch (error) {
    console.error('Error fetching group list:', error);
    throw error;
  }
};

const useGroupList = (
  page: number,
  filters: Filters = {},
  refreshKey: number,
) => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken);
      setIsReady(true);
    };

    fetchToken();
  }, [getToken]);

  return useQuery<FetchGroupListResponse, Error>({
    queryKey: ['groupList', token, page, filters, refreshKey], // Thêm refreshKey vào queryKey
    queryFn: async () => {
      if (!token) {
        throw new Error('Token is not available');
      }
      return fetchGrouplist(page, token, filters);
    },
    enabled: isReady && !!token,
    staleTime: 60000,
  });
};

export { useGroupList };
