import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'; // Thêm style cho slideshow
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const NewSekelton = () => {
  return (
    <div className="relative cursor-pointer">
      <div
        className="rounded-lg -bottom-10 w-3/4 absolute left-1/2 transform -translate-x-1/2 bg-primary-800 px-3"
        style={{
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25)', // Điều chỉnh độ mờ và hướng của shadow
        }}
      >
        <Slide
          easing="ease"
          autoplay={true}
          duration={3000}
          transitionDuration={500}
          arrows={true}
          prevArrow={
            <div
              style={{
                width: '20px',
                height: '20px',
                fontSize: '14px',
                color: 'white',
              }}
            >
              {<FaArrowLeft />}
            </div>
          }
          nextArrow={
            <div
              style={{
                width: '20px',
                height: '20px',
                fontSize: '14px',
                color: 'white',
              }}
            >
              {<FaArrowRight />}
            </div>
          }
        >
          {[...Array(3)].map((_, slideIndex) => (
            <div
              className="flex flex-wrap justify-between px-4"
              key={slideIndex}
            >
              {[...Array(4)].map((_, newsIndex) => (
                <div
                  className="bg-primary-800 p-2 lg:p-4 w-full sm:w-1/2 md:w-1/4 skeleton"
                  key={newsIndex}
                >
                  <div className="bg-gray-300 h-3 w-24 mb-2 animate-pulse"></div>
                  <div className="bg-gray-300 h-6 w-full mb-3 animate-pulse"></div>
                  <div className="bg-gray-300 h-4 w-32 mb-2 animate-pulse"></div>
                  <div className="bg-gray-300 h-4 w-40 animate-pulse"></div>
                </div>
              ))}
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default NewSekelton;
