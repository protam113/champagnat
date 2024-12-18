'use client';

import React, { useState } from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { CategoriesList } from '@/lib/categoriesList';
import { IoDocumentText } from '@/lib/iconLib';
import { CategoryProps } from '@/types/types';
import { FiMenu } from 'react-icons/fi';

const { Sider } = Layout;
const { Title } = Typography;

const Slider = ({ handleTagChange, onResetFilter }: CategoryProps) => {
  const [currentPage] = useState(1);
  const [model] = useState<string>('document');
  const { queueData, isLoading, isError } = CategoriesList(
    currentPage,
    model,
    0,
  );

  const menuItems = isLoading
    ? [{ key: 'loading', label: 'Đang tải...' }]
    : isError
      ? [{ key: 'error', label: 'Lỗi tải danh mục' }]
      : Array.isArray(queueData)
        ? queueData.map((category: any) => ({
            key: category.id,
            label: category.name,
            icon: <IoDocumentText />,
            onClick: () => handleTagChange(category.id),
          }))
        : [];

  return (
    <Sider
      width={240}
      breakpoint="lg"
      collapsedWidth="0"
      style={{
        background: '#ffffff',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '16px',
          background: '#ffffff',
          textAlign: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Button
          onClick={onResetFilter}
          type="primary"
          className="transition-all duration-300"
        >
          Reset
        </Button>
      </div>
      <div
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Title
          level={4}
          style={{
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            backgroundColor: '#0f314b',
            padding: '5px',
            color: '#ffffff',
          }}
        >
          <FiMenu />
          Danh Mục
        </Title>
      </div>
      <div style={{ background: '#ffffff' }}>
        <Menu
          mode="inline"
          selectedKeys={[]}
          style={{
            height: 'calc(100% - 100px)',
            overflowY: 'auto',
            backgroundColor: 'transparent',
          }}
          items={menuItems}
        />
      </div>
    </Sider>
  );
};

export default Slider;
