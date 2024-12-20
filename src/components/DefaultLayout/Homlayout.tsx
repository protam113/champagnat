// src/components/layout/DefaultLayout/index.tsx
import { ReactNode } from 'react';

import Breadcrumb from '../design/BreackCumb';

interface DefaultLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="mb-2 mt-4 text-center">
        <Breadcrumb />
      </div>
      <main>{children}</main>
    </>
  );
};

export default ClientLayout;
