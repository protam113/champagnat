"use client";

import Container from "@/app/components/Container/container";
import About from "@/app/components/main/donation/about";
import Donate from "@/app/components/main/donation/donate";
import Intro from "@/app/components/main/donation/intro";
import Testimonials from "@/app/components/main/donation/testimonials";

import React from "react";

const DonatePage = () => {
  return (
    <Container>
      <div className="bg-gray-50">
        {/* intro */}
        <Intro />

        {/* About Section */}
        <About />

        {/* How to Donate Section */}
        <Donate />

        {/* Testimonials Section */}
        <Testimonials />
      </div>
    </Container>
  );
};

export default DonatePage;
