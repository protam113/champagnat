'use client';

import Container from '@/app/components/Container/container';
import Donate from '@/app/components/main/donation/donate';
import Intro from '@/app/components/main/donation/intro';
import React from 'react';
import FAQ from '@/app/components/main/donation/faq';
import DonateContent from '@/app/components/main/donation/DonateContent';

const DonatePage = () => {
  return (
    <Container>
      {/* intro */}
      <Intro />

      {/* How to Donate Section */}
      <Donate />

      <DonateContent />

      {/* Testimonials Section */}
      <FAQ />
    </Container>
  );
};

export default DonatePage;
