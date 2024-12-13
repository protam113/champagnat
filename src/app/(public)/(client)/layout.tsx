// src/layout/DashboardLayout.tsx
'use client';

import React from 'react'; // , { useEffect }
import ClientLayout from '@/app/components/DefaultLayout/Homlayout';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
}
