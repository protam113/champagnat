'use client';

import React, { useState } from 'react';
import Slider from '../components/main/study/studySlider';
import StudyProb from '../components/main/study/StudyProb';
import { Layout, theme } from 'antd';

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
          padding: '24px 0',
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
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
