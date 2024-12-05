// src/layout/DashboardLayout.tsx
'use client';

import React, { useEffect, useState } from 'react'; // , { useEffect }
import LayoutPage from '../components/main/study/layout';
import { useAuth } from '@/context/authContext';
import Loading from '../components/design/Loading';
// import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login'); // Điều hướng tới trang đăng nhập nếu chưa đăng nhập
    } else {
      setIsLoading(false); // Khi xác thực xong thì ẩn loading
    }
  }, [isAuthenticated, loading, router]);

  if (loading || isLoading) {
    return <Loading />; // Hiển thị Loading trong khi đang xác thực
  }

  return <LayoutPage>{children}</LayoutPage>;
}
