'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchCategoriesListResponse, Filters } from '@/types/types';

const fetchCategoryList = async (
  filters: Filters,
  pageParam: number = 1,
  token?: string,
): Promise<FetchCategoriesListResponse> => {
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
      `${endpoints.categories}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null,
      token || null,
    );
    return response;
  } catch (error) {
    console.error('Error fetching categories list:', error);
    throw error;
  }
};

const useCategoryList = (
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

  return useQuery<FetchCategoriesListResponse, Error>({
    queryKey: ['categoriesList', filters, page, token, refreshKey], // Thêm refreshKey vào queryKey
    queryFn: async () => {
      return fetchCategoryList(filters, page, token || undefined);
    },
    staleTime: 60000,
  });
};

export { useCategoryList };
