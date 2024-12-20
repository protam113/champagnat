// src/layout/DashboardLayout.tsx
'use client';

import ClientLayout from '@/components/DefaultLayout/Homlayout';
import React from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayout>{children}</ClientLayout>;
}
