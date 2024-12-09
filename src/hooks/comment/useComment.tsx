'use client';

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { Filters } from '@/types/types';
import { FetchCommentListResponse, NewComment } from '@/types/types';

const fetchCommentList = async (
  filters: Filters,
  pageParam: number = 1,
  token?: string,
): Promise<FetchCommentListResponse> => {
  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([, value]) => value !== undefined && value !== '' && value !== null,
    ),
  );

  // Construct the query string
  const queryString = new URLSearchParams({
    page: pageParam.toString(),
    ...validFilters, // Merge các bộ lọc hợp lệ
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

// Custom hook for fetching the blog list
const useCommentList = (
  page: number,
  filters: Filters = {},
  refreshKey: number,
) => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  // Fetch token only once when component mounts
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

const CreateComment = async (newBlog: NewComment, token: string) => {
  const formData = new FormData();

  // Duyệt qua các thuộc tính của `newBlog` và xử lý
  for (const key in newBlog) {
    const value = newBlog[key as keyof NewComment];

    if (key === 'content') {
      // Xử lý content nếu là object hoặc JSON string
      formData.append(key, JSON.stringify(value));
    } else if (key === 'category' && Array.isArray(value)) {
      value.forEach((id) => formData.append('category', id)); // Gửi từng ID
    } else if (key === 'image' && typeof value === 'string') {
      // Nếu là URL hình ảnh
      formData.append(key, value);
    } else if (key === 'image' && Array.isArray(value)) {
      // Nếu là mảng hình ảnh tải lên
      value.forEach((file) => {
        formData.append('image', file);
      });
    } else if (value) {
      // Thêm các trường khác
      formData.append(key, value as string);
    }
  }

  if (!token) throw new Error('No token available');

  try {
    // Gửi FormData tới backend
    const response = await handleAPI(
      `${endpoints.blogs}`,
      'POST',
      formData,
      token,
    );
    return response.data;
  } catch (error: any) {
    console.error('Error creating blog:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to create blog');
  }
};

const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken);
    };

    fetchToken();
  }, [getToken]);

  return useMutation({
    mutationFn: async (newBlog: NewComment) => {
      if (!token) {
        throw new Error('Token is not available');
      }
      return CreateComment(newBlog, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
    },
    onError: (error) => {
      console.log(error.message || 'Failed to create blog.');
    },
  });
};

export { useCommentList, useCreateComment };
