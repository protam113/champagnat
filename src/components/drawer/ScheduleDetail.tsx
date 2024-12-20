'use client';

import React from 'react';
import { Drawer } from 'antd';
import { FeastDrawerProps } from '@/types/types';

const FeastDrawer: React.FC<FeastDrawerProps> = ({
  visible,
  onClose,
  selectedDate,
  selectedFeast,
}) => {
  return (
    <>
      {/* Main FeastDrawer showing feast details */}
      <Drawer
        title="Thông tin ngày"
        placement="right"
        onClose={onClose}
        open={visible}
        width={400}
      >
        {selectedDate && (
          <div>
            <p>
              <strong>Ngày:</strong> {selectedDate}
            </p>
            {selectedFeast ? (
              <div>
                <p>
                  <strong>Tên lễ:</strong> {selectedFeast.feast_name}
                </p>
                <p>
                  <strong>Loại lễ:</strong> {selectedFeast.feast_type}
                </p>
                <p>
                  <strong>Mô tả:</strong>{' '}
                  {selectedFeast.description || 'Không có'}
                </p>
              </div>
            ) : (
              <p>Không có lễ trong ngày này.</p>
            )}
          </div>
        )}

        {/* Button to trigger opening the CreateSchedule drawer */}
      </Drawer>

      {/* CreateSchedule drawer for creating new schedule */}
    </>
  );
};

export default FeastDrawer;
