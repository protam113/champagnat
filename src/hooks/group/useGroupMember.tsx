'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { FetchGroupMemberListResponse } from '@/types/types';

const fetchGroupMember = async (
  pageParam: number = 1,
  groupId: string,
  token: string,
): Promise<FetchGroupMemberListResponse> => {
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    // Construct the query string
    const queryString = new URLSearchParams({
      page: pageParam.toString(),
    }).toString();

    // Make the API request using handleAPI
    const response = await handleAPI(
      `${endpoints.groupMember.replace(':id', groupId)}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null,
      token,
    );
    return response;
  } catch (error) {
    console.error('Error fetching group list:', error);
    throw error; // Rethrow error for further handling
  }
};

// Custom hook for fetching the queue list
const useGroupMember = (page: number, refreshKey: number, groupId: string) => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken);
    };
    fetchToken();
  }, [getToken]);

  return useQuery<FetchGroupMemberListResponse, Error>({
    queryKey: ['groupMemberList', token, page, groupId, refreshKey], // Thêm refreshKey vào queryKey
    queryFn: async () => {
      if (!token) {
        throw new Error('Token is not available');
      }
      return fetchGroupMember(page, groupId, token);
    },
    enabled: !!token,
    staleTime: 60000,
  });
};

export { useGroupMember };
