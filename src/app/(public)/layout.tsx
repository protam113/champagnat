// src/layout/DashboardLayout.tsx
'use client';

import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/app/components/DefaultLayout';
import ScrollToTopButton from '../components/button/ScrollToTopButton';
import Loading from '../components/design/Loading';
import { useAuthStore } from '@/store/authStore';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading, checkAuth } = useAuthStore(); // Sử dụng hook từ store của bạn
  const [tokenChecked, setTokenChecked] = useState(false);

  // Kiểm tra trạng thái xác thực khi mount
  useEffect(() => {
    checkAuth(); // Kiểm tra xác thực khi mount trang
  }, []);

  // Cập nhật tokenChecked sau khi kiểm tra xong
  useEffect(() => {
    if (!loading) {
      setTokenChecked(true); // Token đã được kiểm tra
    }
  }, [loading]);

  // Nếu đang loading, hiển thị Loading spinner
  if (loading || !tokenChecked) {
    return <Loading />;
  }

  return (
    <DefaultLayout>
      {children}
      <ScrollToTopButton />
    </DefaultLayout>
  );
}
