// src/components/layout/DefaultLayout/index.tsx
import { ReactNode } from 'react';
import Header, { TopHeader } from './components/Header';
import Footer from './components/Footer';
import Breadcrumb from '../design/BreackCumb';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="relative">
      {' '}
      {/* Thêm lớp relative cho container */}
      <TopHeader />
      <Header /> {/* Đặt Navbar với z-index cao */}
      <main>
        {/* <Breadcrumb />{' '} */}
        {/* Thêm padding-top cho main để không bị che bởi Navbar */}
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default DefaultLayout;
