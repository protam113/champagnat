// src/layout/DashboardLayout.tsx
import React from 'react';
import DefaultLayout from '@/app/components/DefaultLayout';

import ScrollToTopButton from '../components/button/ScrollToTopButton';
// import { UserProvider } from '@/context/userContext';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <UserProvider>
    <DefaultLayout>
      {children}
      <ScrollToTopButton />
    </DefaultLayout>
    // </UserProvider>
  );
}
