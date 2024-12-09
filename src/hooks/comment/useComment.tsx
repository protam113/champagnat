'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { Filters } from '@/types/types';

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  profile_image: string;
}

interface CommentList {
  id: number;
  guest_name: string | null;
  guest_email: string | null;
  content: string;
  user: User;
  reply_count: number;
  created_date: string;
  comment_count: number;
  parent: string | null;
}

interface FetchCommentListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CommentList[];
}

const fetchCommentList = async (
  filters: Filters,
  pageParam: number = 1,
  token?: string,
): Promise<FetchCommentListResponse> => {
  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) => value !== undefined && value !== '' && value !== null,
    ),
  );

  const queryString = new URLSearchParams({
    page: pageParam.toString(),
    ...validFilters,
  }).toString();

  try {
    // Gửi request với token nếu có, không thì bỏ qua
    const response = await handleAPI(
      `${endpoints.comment}${queryString ? `?${queryString}` : ''}`,
      'GET',
      null,
      token || null, // Token chỉ được thêm nếu không null
    );
    return response;
  } catch (error) {
    console.error('Lỗi khi tải bình luận:', error);
    throw error;
  }
};

const useCommentList = (
  page: number,
  filters: Filters = {},
  refreshKey: number,
) => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken); // Lưu token nếu có
    };

    fetchToken();
  }, [getToken]);

  return useQuery<FetchCommentListResponse, Error>({
    queryKey: ['commentList', filters, page, token, refreshKey],
    queryFn: async () => fetchCommentList(filters, page, token || undefined), // Không ép buộc token
    staleTime: 60000, // Đặt stale time để không yêu cầu API mỗi lần
    retry: 2, // Retry 2 lần khi gặp lỗi mạng
    refetchOnWindowFocus: false, // Tắt tự động gọi lại khi focus window
  });
};

export { useCommentList };
