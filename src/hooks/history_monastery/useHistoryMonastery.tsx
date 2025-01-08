'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { HistoryMonasteryResponse, Filters } from '@/types/types';

const fetchHistoryMonastery = async (
  filters: Filters,
  token?: string,
): Promise<HistoryMonasteryResponse> => {
  try {
    // Filter out invalid or undefined filter valuess
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) => value !== undefined && value !== '',
      ),
    );

    // Convert all filter values to strings
    const stringifiedFilters = Object.fromEntries(
      Object.entries(validFilters).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(',') : String(value),
      ]),
    );

    // Construct the query string
    const queryString = new URLSearchParams(stringifiedFilters).toString();

    // Make the API request using handleAPI
    const response = await handleAPI(
      `${endpoints.nhaDong}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null,
      token || null,
    );
    return response;
  } catch (error) {
    console.error('Error fetching history list:', error);
    throw error; // Rethrow error for further handling
  }
};

// Custom hook for fetching the queue list
const useHistoryMonastery = (refreshKey: number, filters: Filters = {}) => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken);
    };
    fetchToken();
  }, [getToken]);

  return useQuery<HistoryMonasteryResponse, Error>({
    queryKey: ['history', filters, token, refreshKey], // Thêm refreshKey vào queryKey
    queryFn: async () => {
      return fetchHistoryMonastery(filters, token || undefined);
    },
    staleTime: 60000 * 30,
  });
};

export { useHistoryMonastery };
