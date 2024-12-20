import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';

interface CarouselHeroProps {
  events: { id: string; image: string }[];
}

const CarouselHero: React.FC<CarouselHeroProps> = ({ events }) => (
  <Carousel autoplay>
    {events.map((event) => (
      <div key={event.id} className="h-[350px] w-full">
        <Image
          src={event.image}
          alt={`Carousel Item ${event.id}`}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    ))}
  </Carousel>
);

export default CarouselHero;
