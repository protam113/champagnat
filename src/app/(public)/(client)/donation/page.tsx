'use client';

import Container from '@/app/components/Container/container';
import Intro from '@/app/components/main/donation/intro';
import React from 'react';
import DonateContent from '@/app/components/main/donation/DonateContent';

const DonatePage = () => {
  return (
    <Container>
      <Intro />
      <DonateContent />
    </Container>
  );
};

export default DonatePage;
