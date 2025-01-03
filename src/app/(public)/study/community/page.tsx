'use client'; // Ensures this is a client component

import React, { useState } from 'react';
import { Table, Button, Spin, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FaArrowLeft, FaArrowRight, FaSync } from 'react-icons/fa'; // Import refresh icon
import { GroupList } from '@/lib/groupList';
import dayjs from 'dayjs';
import { EyeOutlined } from '@ant-design/icons';
import Heading from '@/components/design/Heading';
import GroupDetailDrawer from '@/components/drawer/GroupDetailDrawer';

const Page: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [model] = useState<string>('');
  const [refreshKey, setRefreshKey] = useState(0);
  // Pass model into CategoriesList
  const { queueData, next, isLoading, isError } = GroupList(
    currentPage,
    model,
    refreshKey,
  );

  const totalPages = next ? currentPage + 1 : currentPage;

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleViewDetails = (group: any) => {
    setSelectedGroup(group);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedGroup(null);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (_, __, index) => <span>{index + 1}</span>, // index + 1
    },
    {
      title: 'Chi Tiết',
      dataIndex: 'full',
      key: 'full',
      width: 150,
      render: (_, record) => (
        <Button onClick={() => handleViewDetails(record)}>
          <EyeOutlined /> Xem Chi Tiết
        </Button>
      ),
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'image',
      key: 'image',
      width: 150,
      render: (fileUrl: string) => (
        <Image
          width={100}
          src={fileUrl}
          preview={{
            destroyOnClose: true,
          }}
          alt="Group Image"
        />
      ),
    },
    {
      title: 'Tên Cộng Đoàn',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Ngày Thành Lập',
      dataIndex: 'founding_date',
      key: 'founding_date',
      width: 150,
      render: (text) => (
        <span>{text ? dayjs(text).format('DD/MM/YYYY') : ''}</span>
      ), // Format date to "DD/MM/YYYY"
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'created_date',
      key: 'created_date',
      width: 150,
      render: (text) => (
        <span>{text ? dayjs(text).format('DD/MM/YYYY') : ''}</span>
      ), // Format date to "DD/MM/YYYY"
    },
  ];

  if (isLoading) return <Spin size="large" />;
  if (isError) return <div>Error loading queue data.</div>;

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1); // Refresh data manually
  };

  return (
    <>
      <div className="p-4">
        <Heading name="danh sách cộng đoàn  " />

        {/* Model selection */}
        <div className="flex justify-between items-center mb-4">
          <Button onClick={handleRefresh} style={{ marginLeft: '8px' }}>
            <FaSync /> Làm mới
          </Button>
        </div>

        <div className="overflow-auto" style={{ maxHeight: '800px' }}>
          <Table
            columns={columns}
            dataSource={queueData}
            rowKey="id"
            pagination={false}
            scroll={{ y: 500 }}
            rowSelection={{
              selectedRowKeys: selectedKeys,
              onChange: (selectedRowKeys) =>
                setSelectedKeys(selectedRowKeys as number[]),
            }}
          />
        </div>
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'center', // Căn giữa
          }}
        >
          <div className="flex justify-center mt-8 items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center justify-center w-6 h-6 text-10 bg-gray-200 rounded-full hover:bg-gray-300 ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaArrowLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-6 h-6 text-10 rounded-full hover:bg-gray-300 ${currentPage === i + 1 ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={!next}
              className={`flex items-center justify-center w-6 h-6 text-10 bg-gray-200 rounded-full hover:bg-gray-300 ${
                !next ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      <GroupDetailDrawer
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        group={selectedGroup}
      />
    </>
  );
};

export default Page;
