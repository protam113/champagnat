'use client';

import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import logo from '@/assets/image/image_logo.png';
import Image from 'next/image';

const { Header } = Layout;

const SidebarStudy: React.FC = () => {
  const items = [
    {
      key: '1',
      label: <Link href="/study">Tài Liệu</Link>,
    },
    {
      key: '2',
      label: <Link href="/study/ChatAI">MaristChat</Link>,
    },
    {
      key: '3',
      label: <Link href="/study/community">Cộng Đoàn</Link>,
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ marginRight: 'auto' }}>
          <Image src={logo} alt="logo" height={20} width={40} />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
    </Layout>
  );
};

export default SidebarStudy;
