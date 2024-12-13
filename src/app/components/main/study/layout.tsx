'use client';
import React, { ReactNode } from 'react';
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
    <Layout style={{ background: '#ffffff' }}>
      <SidebarStudy />
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb />
        <div
          style={{
            minHeight: 280,
            padding: 24,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default LayoutPage;
