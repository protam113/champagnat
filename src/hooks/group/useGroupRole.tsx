'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchGroupListResponse } from '@/types/types';

const fetchGroupRolelist = async (
  groupId: string,
  pageParam: number = 1,
  token: string,
): Promise<FetchGroupListResponse> => {
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const queryString = new URLSearchParams({
      page: pageParam.toString(),
    }).toString();

    const url = `${endpoints.groupRole.replace(':id', groupId)}${queryString ? `?${queryString}` : ''}`;

    const response = await handleAPI(url, 'GET', null, token);
    return response;
  } catch (error) {
    console.error('Error fetching group role list:', error);
    throw error;
  }
};

const useGroupRoleList = (
  page: number,
  refreshKey: number,
  groupId: string,
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
    queryKey: ['groupRoleList', token, page, refreshKey, groupId],
    queryFn: async () => {
      if (!token) {
        throw new Error('Token is not available');
      }
      return fetchGroupRolelist(groupId, page, token);
    },
    enabled: isReady && !!token,
    staleTime: 60000,
  });
};

export { useGroupRoleList };
