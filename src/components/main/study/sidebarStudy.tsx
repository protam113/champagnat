'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import Link from 'next/link';
import {
  // BookOutlined,
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
  const [selectedKey, setSelectedKey] = useState('1'); // State to track selected key

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
      icon: <RobotOutlined style={{ color: 'white' }} />,
      label: (
        <Link
          href="/study"
          style={{ color: 'white' }}
          onClick={() => {
            setSelectedKey('1');
            if (isMobile) onClose(); // Close sidebar if on mobile
          }}
        >
          MaristChat
        </Link>
      ),
    },
    {
      key: '2',
      icon: <TeamOutlined style={{ color: 'white' }} />,
      label: (
        <Link
          href="/study/community"
          style={{ color: 'white' }}
          onClick={() => {
            setSelectedKey('2');
            if (isMobile) onClose(); // Close sidebar if on mobile
          }}
        >
          Cộng Đoàn
        </Link>
      ),
    },
    {
      key: '3',
      icon: <SlCalender style={{ color: 'white' }} />,
      label: (
        <Link
          href="/study/schedule"
          style={{ color: 'white' }}
          onClick={() => {
            setSelectedKey('3');
            if (isMobile) onClose(); // Close sidebar if on mobile
          }}
        >
          Lịch Công Giáo
        </Link>
      ),
    },
    {
      key: '4',
      icon: <KeyOutlined style={{ color: 'white' }} />,
      label: (
        <Link
          href="/study/reset_password"
          style={{ color: 'white' }}
          onClick={() => {
            setSelectedKey('4');
            if (isMobile) onClose(); // Close sidebar if on mobile
          }}
        >
          Đổi Mật Khẩu
        </Link>
      ),
    },
    {
      key: '5',
      icon: <UserOutlined style={{ color: 'white' }} />,
      label: (
        <Link
          href="/study/update_profile"
          style={{ color: 'white' }}
          onClick={() => {
            setSelectedKey('5');
            if (isMobile) onClose(); // Close sidebar if on mobile
          }}
        >
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
                selectedKeys={[selectedKey]} // Bind the selectedKey to menu item selection
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
            selectedKeys={[selectedKey]} // Bind the selectedKey to menu item selection
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
