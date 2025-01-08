'use client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Ukiyo from 'ukiyojs';
import Lenis from '@studio-freight/lenis';

const UkiyoDemo = () => {
  useEffect(() => {
    // Khởi tạo Lenis cho cuộn mượt mà
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    // Khởi tạo Ukiyo.js cho hiệu ứng parallax
    const parallax = new Ukiyo('.ukiyo', {
      externalRAF: true,
    });

    // Hàm animation sử dụng RAF và Lenis
    function raf(time: any) {
      parallax.animate();
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    // Bắt đầu animation
    requestAnimationFrame(raf);

    // Cleanup khi component unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="">
      <header className="relative h-screen w-full text-center text-white">
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1606011334315-025e4baab810?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80"
          alt="Parallax Background"
          layout="fill"
        />
        <div className="relative flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl font-bold text-gray-100">
            Hành Trình Đào Tạo Thánh Hiến
          </h1>
          <p className="text-xl text-gray-200 mt-4">
            Hành trình đào tạo của chúng tôi được chia thành các giai đoạn
            chính, mỗi giai đoạn đều mang một mục tiêu riêng biệt, từ việc học
            hỏi giáo lý cơ bản đến việc phát triển sâu sắc đời sống cầu nguyện,
            tu tập và phục vụ cộng đồng.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 px-4 py-12">
        {/* Section 1 */}
        <section className="flex flex-col items-center justify-center lg:py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full items-center">
            <div className="w-full lg:w-full">
              <Image
                className="ukiyo w-full h-auto rounded-lg"
                src="https://images.unsplash.com/photo-1606011334315-025e4baab810?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80"
                alt="Parallax Image 1"
                width={1469}
                height={800}
                data-u-speed="1.3"
              />
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-semibold mb-4">
                Khám Phá và Học Hỏi
              </h2>
              <p className="text-lg">
                Trong giai đoạn đầu, người tham gia được giới thiệu về các giáo
                lý cơ bản và học hỏi về lý tưởng sống. Đây là thời gian để hiểu
                sâu hơn về niềm tin, các nguyên lý tôn giáo và chuẩn bị cho các
                giai đoạn tiếp theo.
              </p>
            </div>
          </div>
        </section>

        {/* Hình ảnh ngăn cách giữa các section */}
        <section className="w-full lg:my-8">
          <Image
            className="w-full h-auto"
            src="https://images.unsplash.com/photo-1606011334315-025e4baab810?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80"
            alt="Separation Image"
            width={1469}
            height={500}
          />
        </section>

        {/* Section 2 */}
        <section className="flex flex-col items-center justify-center w-full lg:py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full items-center">
            <div className="w-full">
              <h2 className="text-3xl font-semibold mb-4">
                Phát Triển Đời Sống Cầu Nguyện
              </h2>
              <p className="text-lg">
                Giai đoạn này tập trung vào việc xây dựng một đời sống cầu
                nguyện sâu sắc. Các học viên sẽ học cách phát triển một mối quan
                hệ gần gũi với Chúa, dành thời gian cho sự chiêm niệm và thờ
                phượng trong mọi khoảnh khắc của cuộc sống.
              </p>
            </div>
            <div className="w-full  lg:w-full">
              <Image
                className="ukiyo w-full h-auto rounded-lg"
                src="https://images.unsplash.com/photo-1606011334315-025e4baab810?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80"
                alt="Parallax Image 1"
                width={1469}
                height={800}
                data-u-speed="1.3"
              />
            </div>
          </div>
        </section>

        {/* Hình ảnh ngăn cách giữa các section */}
        <section className="w-full lg:my-8">
          <Image
            className="w-full h-auto"
            src="https://images.unsplash.com/photo-1606011334315-025e4baab810?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80"
            alt="Separation Image"
            width={1469}
            height={800}
          />
        </section>

        {/* Section 3 */}
        <section className="flex flex-col items-center justify-center w-full lg:py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full items-center">
            <div className="w-full lg:w-full">
              <Image
                className="ukiyo w-full h-auto rounded-lg"
                src="https://images.unsplash.com/photo-1516575150278-77136aed6920?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Parallax Image 3"
                width={1000}
                height={600}
                data-u-speed="1.8"
              />
            </div>
            <div className="w-full">
              <h2 className="text-3xl font-semibold mb-4">
                Tu Tập và Phục Vụ Cộng Đồng
              </h2>
              <p className="text-lg">
                Đây là giai đoạn cao nhất của hành trình, nơi học viên tập trung
                vào việc tu tập và phục vụ cộng đồng. Họ sẽ áp dụng những gì đã
                học được vào thực tế, đồng thời đóng góp vào công tác từ thiện
                và xây dựng một cộng đồng mạnh mẽ, dựa trên các giá trị tinh
                thần.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UkiyoDemo;
