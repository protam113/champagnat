'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Button } from 'antd';
import type { BadgeProps, CalendarProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useScheduleList } from '@/hooks/schedule/useSchedule';
import { FaSync } from '@/lib/iconLib';
import FeastDrawer from '../drawer/ScheduleDetail';

const feastTypeColors: Record<string, BadgeProps['status']> = {
  'Lễ trọng': 'error',
  'Lễ kính': 'warning',
  'Lễ nhớ': 'processing',
  'Lễ nhớ tùy ý': 'default',
  'Lễ nhớ tùy ý*': 'processing',
  ' ': 'processing',
};

const feastPriority = [
  'Lễ trọng',
  'Lễ kính',
  'Lễ nhớ',
  'Lễ nhớ tùy ý',
  'Lễ nhớ tùy ý*',
  ' ',
];

const sortFeasts = (feasts: any[]) => {
  return feasts.sort(
    (a, b) =>
      feastPriority.indexOf(a.feast_type) - feastPriority.indexOf(b.feast_type),
  );
};

const CatholicCalendarTable: React.FC = () => {
  const [selectedFeast, setSelectedFeast] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [ScheduleId, setScheduleId] = useState<string>('');
  const [mode, setMode] = useState<'month' | 'year'>('month');
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [isMobile, setIsMobile] = useState(false); // State to track mobile view

  const { year, month } = {
    year: currentDate.year().toString(),
    month: (currentDate.month() + 1).toString(),
  };

  const {
    data: queueData,
    isLoading,
    isError,
  } = useScheduleList({ year, month }, 0);

  // Check for mobile screen size
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handlePanelChange = (date: Dayjs, newMode: 'month' | 'year') => {
    setCurrentDate(date);
    setMode(newMode);
  };

  const dateCellRender = (value: Dayjs) => {
    const currentDate = value.format('YYYY-MM-DD');
    const dayData = queueData?.find((item: any) => item.day === currentDate);
    const sortedFeasts = dayData?.feasts ? sortFeasts(dayData.feasts) : [];

    return (
      <div
        onClick={() => {
          setSelectedDate(currentDate);
          setSelectedFeast(sortedFeasts.length ? sortedFeasts[0] : null);
          setScheduleId(dayData?.id || null);
          setIsDrawerVisible(true);
        }}
        style={{ cursor: 'pointer' }}
      >
        <ul className="events">
          {sortedFeasts.map((feast: any) => (
            <li key={feast.id}>
              <Badge
                status={feastTypeColors[feast?.feast_type]}
                text={feast.feast_name}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <div>
      {/* Nút làm mới */}
      <div style={{ marginBottom: '16px' }}>
        <Button onClick={() => setCurrentDate(dayjs())}>
          <FaSync /> Làm mới
        </Button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading data</p>
      ) : (
        <Calendar
          cellRender={cellRender}
          mode={mode}
          value={currentDate}
          onPanelChange={handlePanelChange}
          style={{
            maxWidth: isMobile ? '100%' : 'auto', // Adjust width based on screen size
            margin: isMobile ? '0 auto' : 'unset', // Centering for mobile
          }}
        />
      )}

      {/* Drawer chi tiết */}
      <FeastDrawer
        visible={isDrawerVisible}
        onClose={() => setIsDrawerVisible(false)}
        selectedDate={selectedDate}
        selectedFeast={selectedFeast}
        scheduleId={ScheduleId}
      />
    </div>
  );
};

export default CatholicCalendarTable;
