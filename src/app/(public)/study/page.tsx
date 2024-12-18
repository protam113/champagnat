'use client';

import React, { useState } from 'react';

import { Layout, theme } from 'antd';
import Slider from '@/app/components/main/study/studySlider';
import StudyProb from '@/app/components/main/study/StudyProb';

const { Content } = Layout;

const StudyPage = () => {
  const [category, setCategory] = useState<string>(''); // Tag hiện tại
  const [refreshKey, setRefreshKey] = useState(0); // Để làm mới dữ liệu

  const handleTagChange = (selectedTag: string) => {
    setCategory(selectedTag); // Cập nhật tag
  };

  const handleResetFilter = () => {
    setCategory(''); // Reset tag
    setRefreshKey((prev) => prev + 1); // Tăng refreshKey để làm mới
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      <Layout
        style={{
          background: '#ffffff',
        }}
      >
        <Slider
          category={category}
          handleTagChange={handleTagChange}
          refreshKey={refreshKey}
          onResetFilter={handleResetFilter}
        />
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <StudyProb category={category} refreshKey={refreshKey} />
        </Content>
      </Layout>
    </div>
  );
};

export default StudyPage;
