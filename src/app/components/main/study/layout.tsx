'use client';
import React, { ReactNode } from 'react';
import Header from '@/app/components/DefaultLayout/components/Header';
import Footer from '../../DefaultLayout/components/Footer';
import SidebarStudy from './sidebarStudy';
import { Layout, theme } from 'antd';
import Breadcrumb from '../../design/BreackCumb';

const { Content } = Layout;

interface PrivateLayoutProps {
  children: ReactNode; // Khai báo kiểu cho children
}

const LayoutPage: React.FC<PrivateLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header />
      <SidebarStudy />
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default LayoutPage;
