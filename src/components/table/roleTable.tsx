'use client';

import React, { useState } from 'react';
import { Table, Spin, Alert, Pagination } from 'antd';
import { Group } from '@/types/types';
import { useGroupRoleList } from '@/hooks/group/useGroupRole';

const RoleTableModal: React.FC<Group> = ({ groupId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0); // State để làm mới dữ liệu

  // Gọi custom hook để lấy dữ liệu role
  const { data, isLoading, isError } = useGroupRoleList(
    currentPage,
    refreshKey,
    groupId,
  );

  // Cột của bảng
  const columns = [
    {
      title: 'Tên Vai Trò',
      dataIndex: 'name', // Dữ liệu API trả về có trường name
      key: 'name',
    },
  ];

  // Hiển thị giao diện
  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Spin tip="Đang tải vai trò..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-4">
        <Alert
          message="Lỗi"
          description="Không thể tải danh sách vai trò. Vui lòng thử lại sau."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div>
      <Table
        dataSource={data?.results || []} // Sử dụng `results` từ API trả về
        columns={columns}
        rowKey={(record) => record.id}
        pagination={false}
      />
      {/* Phân trang */}

      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'center', // Căn giữa
        }}
      >
        <Pagination
          current={currentPage}
          total={data?.count || 0}
          pageSize={10} // Mặc định mỗi trang 10 mục
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default RoleTableModal;
