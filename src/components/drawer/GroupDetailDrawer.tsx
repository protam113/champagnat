'use client';

import React from 'react';
import { Drawer, Typography, Divider, Button, Image } from 'antd';
import RoleTableModal from '../table/roleTable';
import GroupMember from '../table/GroupMemberTable';
import { GroupDetail } from '@/types/types';

const { Title } = Typography;

const GroupDetailDrawer: React.FC<GroupDetail> = ({ open, onClose, group }) => {
  if (!group) return null;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Thông Tin Chi Tiết Cộng Đoàn"
      width={1200}
      bodyStyle={{ padding: '24px' }}
    >
      {group.image && (
        <div className="mb-4 flex justify-center">
          <Image
            src={group.image}
            alt="Group Avatar"
            width={150}
            height={150}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            className="shadow-lg"
          />
        </div>
      )}
      {/* Tiêu đề bài viết */}
      <Title level={3} className="text-3xl font-semibold text-gray-900 mb-4">
        {group.name}
      </Title>
      {/* Nội dung bài viết */}
      <div className="mb-4">
        <strong className="text-16 text-gray-900">Số Lượng Thành Viên</strong>
        <div className="space-y-4 mt-2">
          <p className="text-gray-600">{group.member_count}</p>
        </div>
      </div>
      {/* Danh sách vai trò */}
      <Divider />
      <RoleTableModal groupId={group.id} />{' '}
      {/* Truyền groupId vào RoleTableModal */}
      <GroupMember groupId={group.id} />
      {/* Nút đóng */}
      <div className="flex justify-end mt-4">
        <Button
          onClick={onClose}
          className="bg-gray-500 text-white hover:bg-gray-600"
        >
          Đóng
        </Button>
      </div>
    </Drawer>
  );
};

export default GroupDetailDrawer;
