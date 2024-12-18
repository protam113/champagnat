'use client';

import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
// import Image from 'next/image';
import {
  BookOutlined,
  RobotOutlined,
  TeamOutlined,
  KeyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { SlCalender } from '@/lib/iconLib';
// import logo from '@/assets/image/image_logo.png';

const { Header } = Layout;

const SidebarStudy: React.FC = () => {
  const items = [
    {
      key: '1',
      icon: <BookOutlined style={{ color: 'white' }} />, // Màu biểu tượng
      label: (
        <Link href="/study" style={{ color: 'white' }}>
          Tài Liệu
        </Link>
      ), // Màu chữ
    },
    {
      key: '2',
      icon: <RobotOutlined style={{ color: 'white' }} />,
      label: (
        <Link href="/study/ChatAI" style={{ color: 'white' }}>
          MaristChat
        </Link>
      ),
    },
    {
      key: '3',
      icon: <TeamOutlined style={{ color: 'white' }} />,
      label: (
        <Link href="/study/community" style={{ color: 'white' }}>
          Cộng Đoàn
        </Link>
      ),
    },
    {
      key: '6',
      icon: <SlCalender style={{ color: 'white' }} />,
      label: (
        <Link href="/study/schedule" style={{ color: 'white' }}>
          Lịch Công Giáo
        </Link>
      ),
    },
    {
      key: '4',
      icon: <KeyOutlined style={{ color: 'white' }} />,
      label: (
        <Link href="/study/reset_password" style={{ color: 'white' }}>
          Đổi Mật Khẩu
        </Link>
      ),
    },
    {
      key: '5',
      icon: <UserOutlined style={{ color: 'white' }} />,
      label: (
        <Link href="/study/update_profile" style={{ color: 'white' }}>
          Cập Nhật Thông Tin
        </Link>
      ),
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
          backgroundColor: '#0f314b',
          padding: '0 20px',
        }}
      >
        {/* Logo */}
        {/* <div
          style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}
        >
          <Image src={logo} alt="logo" height={30} width={70} />
        </div> */}

        {/* Menu */}
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          className="menu-custom"
          style={{
            flex: 1,
            justifyContent: 'center',
            minWidth: 0,
            backgroundColor: '#0f314b',
          }}
        />
      </Header>
    </Layout>
  );
};

export default SidebarStudy;
