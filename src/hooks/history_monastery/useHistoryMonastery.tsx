'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { HistoryMonasteryResponse } from '@/types/types';

const fetchHistoryMonastery = async (
  token?: string,
): Promise<HistoryMonasteryResponse> => {
  try {
    // Make the API request using handleAPI
    const response = await handleAPI(
      `${endpoints.nhaDong}`,
      'GET',
      null,
      token || null,
    );
    return response;
  } catch (error) {
    console.error('Error fetching event list:', error);
    throw error; // Rethrow error for further handling
  }
};

// Custom hook for fetching the queue list
const useHistoryMonastery = (refreshKey: number) => {
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
    queryKey: ['history', token, refreshKey], // Thêm refreshKey vào queryKey
    queryFn: async () => {
      return fetchHistoryMonastery(token || undefined);
    },
    staleTime: 60000 * 30,
  });
};

export { useHistoryMonastery };
