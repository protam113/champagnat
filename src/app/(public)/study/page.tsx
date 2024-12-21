'use client';

import React, { useState } from 'react';

import { Layout } from 'antd';
import Slider from '@/components/main/study/studySlider';
import StudyProb from '@/components/main/study/StudyProb';

const { Content } = Layout;

const StudyPage = () => {
  const [category, setCategory] = useState<string>('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTagChange = (selectedTag: string) => {
    setCategory(selectedTag);
  };

  const handleResetFilter = () => {
    setCategory(''); // Reset tag
    setRefreshKey((prev) => prev + 1); // Tăng refreshKey để làm mới
  };

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
        <Content style={{ padding: '0 24px' }}>
          <StudyProb category={category} refreshKey={refreshKey} />
        </Content>
      </Layout>
    </div>
  );
};

export default StudyPage;
