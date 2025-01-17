'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchBannerListResponse, Filters } from '@/types/types';

const fetchBannerList = async (
  filters: Filters,
  token?: string,
): Promise<FetchBannerListResponse> => {
  try {
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== null && value !== '',
      ),
    );

    // Convert filter values to strings and handle arrays by converting them to comma-separated strings
    const queryString = new URLSearchParams(
      Object.entries(validFilters).map(([key, value]) => {
        if (Array.isArray(value)) {
          // If the value is an array, join it into a string with commas
          return [key, value.join(',')];
        }
        return [key, String(value)];
      }),
    ).toString();

    // Make the API request using handleAPI
    const response = await handleAPI(
      `${endpoints.banner}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null,
      token || null,
    );

    return response;
  } catch (error) {
    console.error('Error fetching banner list:', error);
    throw error; // Rethrow the error for further handling
  }
};

// Custom hook for fetching the queue list
const useBannerList = (filters: Filters = {}, refreshKey: number) => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken);
    };

    fetchToken();
  }, [getToken]);

  return useQuery<FetchBannerListResponse, Error>({
    queryKey: ['bannerList', filters, refreshKey, token],
    queryFn: async () => {
      return fetchBannerList(filters, token || undefined);
    },

    staleTime: 60000,
  });
};

export { useBannerList };
