'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Badge, Spin, Alert, DatePicker, Select } from 'antd';
import type { BadgeProps } from 'antd';
import { useScheduleList } from '@/hooks/schedule/useSchedule';
import { useInView } from 'react-intersection-observer';

const { Option } = Select;

const ITEMS_PER_PAGE = 30;

const feastTypeColors: Record<string, BadgeProps['status']> = {
  'Lễ trọng': 'error',
  'Lễ kính': 'warning',
  'Lễ nhớ': 'processing',
  'Lễ nhớ tùy ý': 'default',
  'Lễ nhớ tùy ý*': 'processing',
};

// Memoize date range calculation
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
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const currentDate = useMemo(() => new Date(), []);

  // Memoize date range calculation
  const dateRange = useMemo(
    () => getDateRange(new Date(`${year}-01-01`), 0, 364),
    [year],
  );

  const {
    data: scheduleData,
    isLoading,
    isError,
  } = useScheduleList({ year, month }, 0);

  // Memoize feast filtering function
  const getFeastsByDate = useCallback(
    (date: Date) => {
      if (!scheduleData || !Array.isArray(scheduleData)) return [];
      const formattedDate = date.toISOString().split('T')[0];
      return scheduleData
        .filter((item) => item.day === formattedDate)
        .flatMap((item) => item.feasts || []);
    },
    [scheduleData],
  );

  // Implement infinite scrolling
  React.useEffect(() => {
    if (inView && visibleItems < dateRange.length) {
      setVisibleItems((prev) =>
        Math.min(prev + ITEMS_PER_PAGE, dateRange.length),
      );
    }
  }, [inView, dateRange.length]);

  // Memoize year change handler
  const handleYearChange = useCallback((date: any) => {
    if (date) {
      setYear(date.year().toString());
      setVisibleItems(ITEMS_PER_PAGE); // Reset visible items when year changes
    }
  }, []);

  // Memoize month change handler
  const handleMonthChange = useCallback((value: string) => {
    setMonth(value);
    setVisibleItems(ITEMS_PER_PAGE); // Reset visible items when month changes
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Spin tip="Đang tải lịch..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Alert message="Lỗi khi tải lịch" type="error" />
      </div>
    );
  }

  return (
    <div>
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
          onChange={handleYearChange}
          placeholder="Chọn năm"
        />

        <Select
          value={month}
          onChange={handleMonthChange}
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
        {dateRange.slice(0, visibleItems).map((date, index) => {
          const feasts = getFeastsByDate(date);
          const isToday = date.toDateString() === currentDate.toDateString();

          return (
            <div key={date.toISOString()} style={{ marginBottom: '16px' }}>
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
                        console.log(feast);
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
              {index < visibleItems - 1 && <hr />}
            </div>
          );
        })}
        <div ref={ref} style={{ height: '20px' }} />
      </div>
    </div>
  );
};

export default CatholicCalendarTable;
