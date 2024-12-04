import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const items = [
  {
    key: '1',
    label: 'Tài liệu',
  },
  {
    key: '2',
    label: 'AI',
  },
  {
    key: '3',
    label: 'Cộng Đoàn',
  },
];

const SidebarStudy: React.FC = () => {
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
    </Layout>
  );
};

export default SidebarStudy;
