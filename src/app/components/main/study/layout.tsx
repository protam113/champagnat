'use client';
import React from 'react';
import Header from '@/app/components/DefaultLayout/components/Header';
import Footer from '../../DefaultLayout/components/Footer';
import SidebarStudy from './sidebarStudy';

const LayoutPage = () => {
  return (
    <div>
      <Header />
      <div>
        <SidebarStudy />
      </div>
      <Footer />
    </div>
  );
};

export default LayoutPage;
