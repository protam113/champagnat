'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import Link from 'next/link';
import {
  BookOutlined,
  RobotOutlined,
  TeamOutlined,
  KeyOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { SlCalender } from '@/lib/iconLib';

const { Header } = Layout;

const SidebarStudy: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const items = [
    {
      key: '1',
      icon: <BookOutlined style={{ color: 'white' }} />,
      label: (
        <Link href="/study" style={{ color: 'white' }}>
          Tài Liệu
        </Link>
      ),
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
        {isMobile ? (
          <>
            <Button
              type="primary"
              onClick={showDrawer}
              style={{ backgroundColor: '#0f314b', border: 'none' }}
            >
              <MenuOutlined style={{ fontSize: '24px', color: 'white' }} />
            </Button>
            <Drawer
              title="Menu"
              placement="right"
              onClose={onClose}
              visible={visible}
              bodyStyle={{ backgroundColor: '#0f314b', padding: 0 }}
            >
              <Menu
                mode="vertical"
                defaultSelectedKeys={['1']}
                items={items}
                className="menu-custom"
                style={{
                  backgroundColor: '#0f314b',
                }}
              />
            </Drawer>
          </>
        ) : (
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
        )}
      </Header>
    </Layout>
  );
};

export default SidebarStudy;
