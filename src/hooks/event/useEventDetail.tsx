'use client';

import { useQuery } from '@tanstack/react-query';
import { handleAPI } from '@/apis/axiosClient';
import { endpoints } from '@/apis/api';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';
import { EventList } from '@/types/types';

const fetchEventDetail = async (
  postId: string,
  token?: string, // Token là tùy chọn
): Promise<EventList> => {
  try {
    // Gửi request với token nếu có, không thì bỏ qua
    const response = await handleAPI(
      `${endpoints.event.replace(':id', postId)}`,
      'GET',
      null,
      token || null, // Token chỉ được thêm nếu không null
    );
    return response;
  } catch (error) {
    console.error('Lỗi khi tải chi tiết bài viết:', error);
    throw error;
  }
};

const useEventDetail = (postId: string) => {
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken); // Lưu token nếu có
    };

    fetchToken();
  }, [getToken]);

  return useQuery<EventList, Error>({
    queryKey: ['eventDetail', token, postId],
    queryFn: async () => fetchEventDetail(postId, token || undefined), // Không ép buộc token
    enabled: !!postId, // Chỉ gọi API khi có token và blogId
    staleTime: 60000, // Đặt stale time để không yêu cầu API mỗi lần
    retry: 2, // Retry 2 lần khi gặp lỗi mạng
    refetchOnWindowFocus: false, // Tắt tự động gọi lại khi focus window
  });
};

export { useEventDetail };
