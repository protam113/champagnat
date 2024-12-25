'use client';

import React, { useState } from 'react';
import { Table, Spin, Alert } from 'antd';
import { Group } from '@/types/types';
import { useGroupRoleList } from '@/hooks/group/useGroupRole';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const RoleTableModal: React.FC<Group> = ({ groupId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0);

  const { data, isLoading, isError } = useGroupRoleList(
    currentPage,
    refreshKey,
    groupId,
  );

  // Tổng số trang
  const pageSize = 10;
  const totalPages = Math.ceil((data?.count || 0) / pageSize); // Tính tổng số trang

  const next = data?.next;

  const columns = [
    {
      title: 'Tên Vai Trò',
      dataIndex: 'name',
      key: 'name',
    },
  ];

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
        dataSource={data?.results || []}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={false}
      />
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          justifyContent: 'center',
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
              className={`w-6 h-6 text-10 rounded-full hover:bg-gray-300 ${
                currentPage === i + 1
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200'
              }`}
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
  );
};

export default RoleTableModal;
