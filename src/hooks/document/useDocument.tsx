'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchDocsListResponse, Filters } from '@/types/types';

/*
        Hooks lấy danh sách tài liệu
    */

const fetchDocList = async (
  filters: Filters,
  pageParam: number = 1,
  token?: string,
): Promise<FetchDocsListResponse> => {
  try {
    // Filter out undefined or empty values from filters
    const validFilters = Object.fromEntries(
      Object.entries(filters).filter(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([, value]) => value !== undefined && value !== '' && value !== null,
      ),
    );

    // Construct the query string
    const queryString = new URLSearchParams({
      page: pageParam.toString(),
      ...validFilters, // Merge the valid filters into the query string
    }).toString();

    // Make the API request using handleAPI
    const response = await handleAPI(
      `${endpoints.documents}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null,
      token || null,
    );
    return response;
  } catch (error) {
    console.error('Error fetching document list:', error);
    throw error; // Rethrow error for further handling
  }
};

// Custom hook for fetching the queue list
const useDocList = (
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

  return useQuery<FetchDocsListResponse, Error>({
    queryKey: ['docList', filters, page, token, refreshKey],
    queryFn: async () => {
      return fetchDocList(filters, page, token || undefined);
    },

    staleTime: 60000,
  });
};

export { useDocList };
