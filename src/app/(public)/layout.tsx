'use client';

import React, { useEffect, useState } from 'react';

import { useAuthStore } from '@/store/authStore';
import Loading from '@/components/design/Loading';
import DefaultLayout from '@/components/DefaultLayout';
import ScrollToTopButton from '@/components/button/ScrollToTopButton';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { loading, checkAuth } = useAuthStore();
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!loading) {
      setTokenChecked(true);
    }
  }, [loading]);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'; // Áp dụng scroll mượt cho toàn bộ trang
  }, []);

  if (loading || !tokenChecked) {
    return <Loading />;
  }

  return (
    <div>
      <DefaultLayout>
        {children}
        <ScrollToTopButton />
      </DefaultLayout>
    </div>
  );
}
