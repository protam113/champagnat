'use client';

import React from // , { useEffect, useState }
'react';
import ClientLayout from '@/app/components/DefaultLayout/Homlayout';
// import { useAuthStore } from '@/store/authStore'; // Đảm bảo bạn đã import đúng
// import Loading from '@/app/components/design/Loading';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { loading, checkAuth } = useAuthStore(); // Sử dụng hook từ store của bạn
  // const [tokenChecked, setTokenChecked] = useState(false);

  // // Kiểm tra trạng thái xác thực khi mount
  // useEffect(() => {
  //   checkAuth(); // Kiểm tra xác thực khi mount trang
  // }, []);

  // // Cập nhật tokenChecked sau khi kiểm tra xong
  // useEffect(() => {
  //   if (!loading) {
  //     setTokenChecked(true); // Token đã được kiểm tra
  //   }
  // }, [loading]);

  // // Nếu đang loading, hiển thị Loading spinner
  // if (loading || !tokenChecked) {
  //   return <Loading />;
  // }

  // Trả về layout chính khi đã sẵn sàng
  return <ClientLayout>{children}</ClientLayout>;
}
