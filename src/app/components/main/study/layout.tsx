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
    <Layout>
      <SidebarStudy />
      <Content style={{ padding: '0 48px' }} className="bg-zinc-400">
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
    </Layout>
  );
};

export default LayoutPage;
