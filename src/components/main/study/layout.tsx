'use client';
import React, { ReactNode } from 'react';
import SidebarStudy from './sidebarStudy';
import { Layout } from 'antd';
import Breadcrumb from '../../design/BreackCumb';
import Container from '../../Container/container';

const { Content } = Layout;

interface PrivateLayoutProps {
  children: ReactNode; // Khai báo kiểu cho children
}

const LayoutPage: React.FC<PrivateLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ background: '#ffffff' }}>
      <SidebarStudy />
      <Container>
        <Content>
          {' '}
          {/* style={{ padding: '0 48px' }} */}
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
      </Container>
    </Layout>
  );
};

export default LayoutPage;
