import { useEffect, useState } from "react";
import Image from "next/image";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css"; // Thêm style cho slideshow
import banner1 from "@/assets/image/banner1.jpg";
import banner2 from "@/assets/image/banner2.jpg";
import banner3 from "@/assets/image/banner3.jpg";
import { FaArrowLeft, FaArrowRight, FaLongArrowAltRight } from "react-icons/fa";

// Dữ liệu cho phần tin tức
const newsData = [
    {
        time: "30/10/2024",
        author: "HOANG",
        title:
            "Đức Giáo hoàng Phanxicô đã công bố tổ chức Công nghị Hồng y vào ngày",
    },
    {
        time: "05/10/2024",
        author: "THUONG",
        title:
            "Đức Giáo hoàng Phanxicô đã công bố tổ chức Công nghị Hồng y vào ngày",
    },
    {
        time: "27/10/2024",
        author: "ALIZABET",
        title:
            "Đức Giáo hoàng Phanxicô đã công bố tổ chức Công nghị Hồng y vào ngày",
    },
    {
        time: "29/10/2024",
        author: "ADMIN",
        title:
            "Đức Giáo hoàng Phanxicô đã công bố tổ chức Công nghị Hồng y vào ngày",
    },
];

const Hero = () => {
    const [isClient, setIsClient] = useState(false);
    const images = [banner1, banner2, banner3]; // Mảng chứa hình ảnh

    // Chia dữ liệu tin tức thành các slide với mỗi slide chứa 4 phần tử
    const slides = [];
    for (let i = 0; i < newsData.length; i += 4) {
        slides.push(newsData.slice(i, i + 4));
    }

    useEffect(() => {
        setIsClient(true); // Đảm bảo rằng code chỉ chạy trên client
    }, []);

    if (!isClient) {
        return null; // Không render component trên server
    }

    return (
        <div className="relative w-full h-4/5">
            <Slide
                easing="ease"
                autoplay={true}
                duration={4000}
                transitionDuration={500}
                arrows={false}
            >
                {images.map((image, index) => (
                    <div className="each-slide" key={index}>
                        <div className="relative w-full h-full">
                            <Image
                                src={image}
                                alt={`Banner Image ${index + 1}`}
                                className="object-cover w-full h-full banner-image"
                            />
                        </div>
                    </div>
                ))}
            </Slide>

            {/* Phần tin tức */}
            <div className="relative cursor-pointer">
                <div
                    className="rounded-lg w-full -bottom-10 md:w-3/4 absolute left-1/2 transform -translate-x-1/2 bg-primary-800 px-3"
                    style={{
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)", // Điều chỉnh độ mờ và hướng của shadow
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
                                    width: "20px",
                                    height: "20px",
                                    fontSize: "14px",
                                    color: "white",
                                }}
                            >
                                {<FaArrowLeft />}
                            </div>
                        }
                        nextArrow={
                            <div
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    fontSize: "14px",
                                    color: "white",
                                }}
                            >
                                {<FaArrowRight />}
                            </div>
                        }
                    >
                        {slides.map((slide, index) => (
                            <div className="flex flex-wrap justify-between px-4" key={index}>
                                {slide.map((news, newsIndex) => (
                                    <div
                                        className="bg-primary-800 p-4 w-full sm:w-1/2 md:w-1/4"
                                        key={newsIndex}
                                    >
                                        <p className="text-gray-300 text-xs font-bold">
                                            <p>{news.time}</p>
                                        </p>
                                        <p className="w-max rounded-xl bg-primary-400 text-white text-xs mt-1 mb-3 py-1 px-3">
                                            {news.author}
                                        </p>
                                        <p
                                            className="text-white text-sm font-bold truncate overflow-hidden"
                                            style={{ maxHeight: "35px", lineHeight: "1.20em" }}
                                        >
                                            {news.title}
                                        </p>
                                        <hr className="border-t-1 border-white mt-2 mb-3" />
                                        <div className="relative flex items-center gap-1 text-primary-100 group">
                                            <i>Tiếp tục đọc</i>{" "}
                                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-1/2"></span>
                                            <FaLongArrowAltRight className="arrow-icon" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Slide>
                </div>
            </div>
        </div>
    );
};

export default Hero;