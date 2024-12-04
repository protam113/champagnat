'use client';

import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode; // Define the type for children
}

const HomeContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <article className="container mx-auto" style={{ width: '1400px' }}>
      {children}
    </article>
  );
};

export default HomeContainer;
