import OrbitingItems from "@/app/components/animate/list/orbiting-items";
import { TextParallaxContentExample } from "@/app/components/animate/scroll/TextParallaxContent";
import Breadcrumb from "@/app/components/design/BreackCumb";
import Heading from "@/app/components/design/Heading";
import React from "react";

const Page = () => {
  return (
    <div>
      <Heading name="Event" />
      <Breadcrumb />
      {/* <OrbitingItems/> */}
      <TextParallaxContentExample/>
    </div>
  );
};

export default Page;
