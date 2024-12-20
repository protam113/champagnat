'use client';

import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode; // Define the type for children
}

const HomeContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <article className="mx-auto mt-4" style={{ width: '1420px' }}>
      {children}
    </article>
  );
};

export default HomeContainer;
