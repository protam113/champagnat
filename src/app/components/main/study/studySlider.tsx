'use client';

import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { CategoriesList } from '@/lib/categoriesList'; // Giả sử bạn đã có CategoriesList hook
import { IoDocumentText } from '@/lib/iconLib';
import { CategoryProps } from '@/types/types';
const { Sider } = Layout;

const Slider = ({ handleTagChange, onResetFilter }: CategoryProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [currentPage] = useState(1);
  const [model] = useState<string>('document');
  const { queueData, isLoading, isError } = CategoriesList(
    currentPage,
    model,
    0,
  );

  // Xử lý danh sách mục menu
  const menuItems = isLoading
    ? [{ key: 'loading', label: 'Đang tải...' }]
    : isError
      ? [{ key: 'error', label: 'Lỗi tải danh mục' }]
      : Array.isArray(queueData)
        ? queueData.map((category: any) => ({
            key: category.id,
            label: category.name,
            icon: <IoDocumentText />,
            onClick: () => handleTagChange(category.id), // Nếu muốn hiển thị icon
          }))
        : [];

  return (
    <>
      <Sider style={{ background: colorBgContainer }} width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%' }}
          items={menuItems}
        />
        <div className="mt-6 flex justify-center">
          <button
            onClick={onResetFilter}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset Filter
          </button>
        </div>
      </Sider>
    </>
  );
};

export default Slider;
