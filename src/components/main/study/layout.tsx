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
          <Breadcrumb />
          <div>{children}</div>
        </Content>
      </Container>
    </Layout>
  );
};

export default LayoutPage;
