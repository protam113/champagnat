import Container from '@/components/Container/container';
import DonateContent from '@/components/main/donation/DonateContent';
import Intro from '@/components/main/donation/intro';
import React from 'react';

const DonatePage = () => {
  return (
    <Container>
      <Intro />
      <DonateContent />
    </Container>
  );
};

export default DonatePage;
