'use client';

import React, { useState } from 'react';
import { Calendar, Badge, Modal } from 'antd';
import type { BadgeProps, CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import { useScheduleList } from '@/hooks/schedule/useSchedule';

// Màu sắc cho các loại lễ
const feastTypeColors: Record<string, BadgeProps['status']> = {
  'Lễ trọng': 'error',
  'Lễ kính': 'warning',
  'Lễ nhớ': 'processing',
  'Lễ nhớ tùy ý': 'default',
  'Lễ nhớ tùy ý*': 'processing',
};

// Sắp xếp loại lễ theo ưu tiên
const feastPriority = [
  'Lễ trọng',
  'Lễ kính',
  'Lễ nhớ',
  'Lễ nhớ tùy ý',
  'Lễ nhớ tùy ý*',
];

// Hàm sắp xếp lễ
const sortFeasts = (feasts: any[]) => {
  return feasts.sort(
    (a, b) =>
      feastPriority.indexOf(a.feast_type) - feastPriority.indexOf(b.feast_type),
  );
};

const CatholicCalendarTable: React.FC = () => {
  const [year] = useState<string>(new Date().getFullYear().toString());
  const [refreshKey] = useState<number>(0);
  const [selectedFeast, setSelectedFeast] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    data: queueData,
    isLoading,
    isError,
  } = useScheduleList({ year: year }, refreshKey);

  // Hiển thị lễ theo ngày
  const dateCellRender = (value: Dayjs) => {
    const currentDate = value.format('YYYY-MM-DD');
    const dayData = queueData?.find((item: any) => item.day === currentDate);

    if (!dayData || !dayData.feasts || dayData.feasts.length === 0) return null;

    const sortedFeasts = sortFeasts(dayData.feasts);

    return (
      <ul className="events">
        {sortedFeasts.map((feast: any) => (
          <li
            key={feast.id}
            onClick={() => {
              setSelectedFeast(feast); // Gán dữ liệu lễ vào trạng thái
              setIsModalVisible(true); // Mở modal
            }}
            style={{ cursor: 'pointer' }}
          >
            <Badge
              status={feastTypeColors[feast.feast_type]}
              text={feast.feast_name}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data</p>
      ) : (
        <Calendar cellRender={cellRender} />
      )}

      {/* Modal hiển thị thông tin lễ */}
      <Modal
        title="Thông tin lễ"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)} // Đóng modal
        footer={null}
      >
        {selectedFeast && (
          <div>
            <p>
              <strong>Tên lễ:</strong> {selectedFeast.feast_name}
            </p>
            <p>
              <strong>Loại lễ:</strong> {selectedFeast.feast_type}
            </p>
            <p>
              <strong>Mô tả:</strong> {selectedFeast.description || 'Không có'}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CatholicCalendarTable;
