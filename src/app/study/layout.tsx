// src/layout/DashboardLayout.tsx
"use client";

import React from "react"; // , { useEffect }
import LayoutPage from "../components/main/study/layout";
// import { useAuth } from '@/context/authContext';
// import { useRouter } from 'next/navigation';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { isAuthenticated, loading } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //     if (!loading && !isAuthenticated) {
  //         router.push('/login'); // Điều hướng tới trang đăng nhập nếu chưa đăng nhập
  //     }
  // }, [isAuthenticated, loading, router]);

  // if (loading || !isAuthenticated) return null; // Đợi xác thực xong trước khi hiển thị

  /**
         <DefaultLayout>
                 // </DefaultLayout>

         **/

  return <LayoutPage>{children}</LayoutPage>;
}
