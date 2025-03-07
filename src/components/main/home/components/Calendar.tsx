'use client';

import React, { useState } from 'react';
import { Badge, Spin, Alert, DatePicker, Select } from 'antd';
import type { BadgeProps } from 'antd';
import { useScheduleList } from '@/hooks/schedule/useSchedule';

const { Option } = Select;

const feastTypeColors: Record<string, BadgeProps['status']> = {
  'Lễ trọng': 'error',
  'Lễ kính': 'warning',
  'Lễ nhớ': 'processing',
  'Lễ nhớ tùy ý': 'default',
  'Lễ nhớ tùy ý*': 'processing',
};

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
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [month, setMonth] = useState<string>(
    (new Date().getMonth() + 1).toString(),
  );
  const [refreshKey] = useState<number>(0);
  const currentDate = new Date();
  const dateRange = getDateRange(new Date(`${year}-01-01`), 0, 364); // Get whole year

  const {
    data: scheduleData,
    isLoading,
    isError,
  } = useScheduleList({ year: year, month: month }, refreshKey);

  const getFeastsByDate = (date: Date) => {
    if (!scheduleData || !Array.isArray(scheduleData)) return [];
    const formattedDate = date.toISOString().split('T')[0];
    return scheduleData
      .filter((item) => item.day === formattedDate)
      .flatMap((item) => item.feasts || []);
  };

  // Show loading
  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin tip="Đang tải lịch..."></Spin>
      </div>
    );
  }

  // Show error
  if (isError) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Alert message="Lỗi khi tải lịch" type="error" />
      </div>
    );
  }

  return (
    <div>
      {/* Year and month selector */}
      <div
        style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '16px',
          alignItems: 'center',
        }}
      >
        <DatePicker
          picker="year"
          onChange={(date) => {
            if (date) {
              setYear(date.year().toString());
            }
          }}
          placeholder="Chọn năm"
        />

        <Select
          value={month}
          onChange={(value) => setMonth(value)}
          style={{ width: 120 }}
          placeholder="Chọn tháng"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <Option key={i + 1} value={(i + 1).toString()}>
              Tháng {i + 1}
            </Option>
          ))}
        </Select>
      </div>

      {/* Calendar Display */}
      <div
        style={{
          maxHeight: '750px',
          overflowY: 'auto',
          padding: '8px',
          border: '1px solid #ddd',
          borderRadius: '4px',
        }}
        className="calendar-container"
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
                        console.log(feast); // Replace with modal if needed
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
    </div>
  );
};

export default CatholicCalendarTable;
