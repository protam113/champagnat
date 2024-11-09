"use client"; // Ensures this is a client component


import Image from "next/image";
import news from "@/assets/image/news.png";
import CalendarCustom from "./Calendar";

export const News = () => {
    return (
        <article className="container mx-auto pt-20" style={{ width: "1400px" }}>
            {/* Phần header của Tin Tức */}
            <header className="bg-primary-500 py-3 rounded-lg flex items-center justify-between">
                <h2 className="text-white font-semibold pl-4">Tin Tức</h2>
                <button className="text-white font-semibold pr-4">Xem thêm</button>
            </header>

            {/* Phần nội dung: Hình ảnh, text và lịch */}
            <div className="flex r justify-between pt-5 gap-2">
                <div>
                    <Image src={news} alt="news" />
                    <p className="mt-4 text-sm">
                        Vatican News (31.8.2024) - Nhân dịp Tổng Công Nghị của Dòng
                        Phanxicô, Đức Thánh cha Phanxicô đã khuyến khích các tu sĩ của Dòng
                        tiếp tục giữ cam kết gìn giữ hòa bình.
                    </p>
                </div>

                {/* Phần lịch */}
                <div className="">
                    <CalendarCustom />
                </div>
            </div>
        </article>
    );
};