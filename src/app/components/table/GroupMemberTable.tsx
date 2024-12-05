'use client'; // Ensures this is a client component

import React, { useState } from 'react';
import { Table, Button, Spin, Image, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FaSync } from 'react-icons/fa'; // Import refresh icon
import dayjs from 'dayjs';
import { EyeOutlined } from '@ant-design/icons';
import Heading from '@/app/components/design/Heading';
import { Group } from '@/types/types';
import GroupMemberDetail from '../drawer/GroupMemberDetail';
import { GroupMemberList } from '@/lib/Group/groupMemberList';

const GroupMember: React.FC<Group> = ({ groupId }) => {
  const [selectedKeys, setSelectedKeys] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  // Pass model into CategoriesList
  const { queueData, isLoading, isError } = GroupMemberList(
    currentPage,
    groupId,
    refreshKey,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null); // State for selected blog

  const handleViewDetails = (member: any) => {
    setSelectedMember(member);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedMember(null);
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
      title: 'Tên Thành Viên',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Ngày Khấn Tạm',
      dataIndex: 'first_vows_date',
      key: 'first_vows_date',
      width: 150,
      render: (text) => (
        <span>{text ? dayjs(text).format('DD/MM/YYYY') : ''}</span>
      ), // Format date to "DD/MM/YYYY"
    },
    {
      title: 'Ngày Khấn trọn Đời  ',
      dataIndex: 'final_vows_date',
      key: 'final_vows_date',
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
        <Heading name="Danh sách người dùng trong group " />

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
          <Pagination
            current={currentPage}
            total={queueData.length || 0} // Thay count bằng length
            pageSize={10} // Mặc định mỗi trang 10 mục
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>

      {/*Xem Thông Tin Chi Tiết Thành Viên Trong Cộng Đoàn*/}
      <GroupMemberDetail
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        member={selectedMember}
      />
    </>
  );
};

export default GroupMember;
