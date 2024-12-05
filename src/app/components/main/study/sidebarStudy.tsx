'use client';

import React, { useState } from 'react';
import { Layout, Menu, Dropdown, message, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { CategoriesList } from '@/lib/categoriesList';
import Link from 'next/link';

const { Header } = Layout;

const SidebarStudy: React.FC = () => {
  const [currentPage] = useState(1);
  const { queueData, isLoading, isError } = CategoriesList(
    currentPage,
    'document',
    0,
  );

  // Hàm xử lý khi click vào danh mục
  const handleCategoryClick = ({ key }: { key: string }) => {
    message.info(`Bạn đã chọn danh mục: ${key}`);
    // Bạn có thể thêm logic xử lý khi chọn danh mục tại đây, ví dụ gọi API hoặc điều hướng.
  };

  // Tạo menu dropdown từ dữ liệu API
  const categoriesMenu = (
    <Menu onClick={handleCategoryClick}>
      {isLoading ? (
        <Menu.Item key="loading">Đang tải...</Menu.Item>
      ) : isError ? (
        <Menu.Item key="error">Lỗi tải danh mục</Menu.Item>
      ) : (
        queueData?.map((category: any) => (
          <Menu.Item key={category.id}>
            <Link href={`/study/${category.id}`}>{category.name}</Link>
          </Menu.Item>
        ))
      )}
    </Menu>
  );

  const items = [
    {
      key: '1',
      label: (
        <Dropdown overlay={categoriesMenu} trigger={['hover', 'click']}>
          <Space>
            Tài liệu
            <DownOutlined />
          </Space>
        </Dropdown>
      ),
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
        <div className="demo-logo" />
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
