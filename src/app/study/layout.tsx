// src/layout/DashboardLayout.tsx
'use client';

import React, { useEffect, useState } from 'react'; // , { useEffect }
import LayoutPage from '../components/main/study/layout';
import Loading from '../components/design/Loading';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, loading, checkAuth } = useAuthStore();
  const router = useRouter();
  const [tokenChecked, setTokenChecked] = useState(false); // Trạng thái kiểm tra token

  // Kiểm tra trạng thái xác thực khi mount
  useEffect(() => {
    checkAuth(); // Kiểm tra xác thực khi mount trang
  }, []); // Chỉ chạy 1 lần khi trang load lại

  // Cập nhật tokenChecked sau khi kiểm tra xong
  useEffect(() => {
    if (!loading) {
      setTokenChecked(true); // Token đã được kiểm tra
    }
  }, [loading]);

  useEffect(() => {
    // Chỉ thực hiện chuyển hướng khi trạng thái loading đã hoàn tất và chưa xác thực
    if (tokenChecked) {
      if (isAuthenticated) {
        // Không chuyển hướng nếu đã xác thực
        console.log('User is authenticated');
      } else {
        // Nếu chưa xác thực, chuyển hướng về login
        console.log('User not authenticated');
        router.replace('/login');
      }
    }
  }, [isAuthenticated, loading, router, tokenChecked]);

  // Nếu đang loading, hiển thị Loading spinner
  if (loading || !tokenChecked) {
    return <Loading />;
  }

  return <LayoutPage>{children}</LayoutPage>;
}
