import React, { useState } from 'react';
import { Badge, Spin, Alert } from 'antd';
import type { BadgeProps } from 'antd';
import { useScheduleList } from '@/hooks/schedule/useSchedule';

// Màu sắc cho các loại lễ
const feastTypeColors: Record<string, BadgeProps['status']> = {
  'Lễ trọng': 'error',
  'Lễ kính': 'warning',
  'Lễ nhớ': 'processing',
  'Lễ nhớ tùy ý': 'default',
  'Lễ nhớ tùy ý*': 'processing',
};

// Hàm lấy dải ngày
const getDateRange = (
  currentDate: Date,
  daysBefore: number,
  daysAfter: number,
) => {
  const dates = [];
  for (let i = -daysBefore; i <= daysAfter; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const CatholicCalendarTable: React.FC = () => {
  const [year] = useState<string>(new Date().getFullYear().toString());
  const [refreshKey] = useState<number>(0);
  const currentDate = new Date();
  const dateRange = getDateRange(currentDate, 0, 31); // Lấy 31 ngày sau

  const {
    data: scheduleData,
    isLoading,
    isError,
  } = useScheduleList({ year: year }, refreshKey);

  const getFeastsByDate = (date: Date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const feasts: any[] = [];
    if (scheduleData && Array.isArray(scheduleData)) {
      for (let i = 0; i < scheduleData.length; i++) {
        if (scheduleData[i].day === formattedDate) {
          feasts.push(...scheduleData[i].feasts); // Lấy tất cả lễ trong ngày
        }
      }
    }
    return feasts;
  };

  // Hiển thị khi dữ liệu đang tải
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin tip="Đang tải lịch..."></Spin>
      </div>
    );
  }

  // Hiển thị khi có lỗi
  if (isError) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Alert message="Lỗi khi tải lịch" type="error" />
      </div>
    );
  }

  return (
    <div
      style={{
        maxHeight: '750px',
        overflowY: 'auto',
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
      }}
    >
      {dateRange.map((date, index) => {
        const feasts = getFeastsByDate(date);
        const isToday = date.toDateString() === currentDate.toDateString();

        return (
          <div key={index} style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '16px',
                backgroundColor: isToday ? '#e6f7ff' : 'transparent',
                padding: '8px',
                borderRadius: '4px',
                border: isToday ? '1px solid #1890ff' : 'none',
              }}
            >
              <strong>
                {date.toLocaleDateString('vi-VN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </strong>
            </div>
            <ul className="events">
              {feasts.length > 0 ? (
                feasts.map((feast: any) => (
                  <li
                    key={feast.id}
                    style={{
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                    onClick={() => {
                      console.log(feast); // Thay bằng modal nếu cần
                    }}
                  >
                    <Badge
                      status={feastTypeColors[feast.feast_type]}
                      text={feast.feast_name}
                    />
                  </li>
                ))
              ) : (
                <li>Không có lễ</li>
              )}
            </ul>
            {index < dateRange.length - 1 && <hr />}
          </div>
        );
      })}
    </div>
  );
};

export default CatholicCalendarTable;
