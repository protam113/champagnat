"use client";

import Container from "@/app/components/main/blog/container";
import BlogGrid from "@/app/components/main/blog/blogProb";

const BlogPage = () => {
    return (
        <Container>
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-primary-900">Bài viết Blog</h1>
                <p className="mt-2 text-gray-600">
                    Khám phá những thông tin chi tiết, bài viết và cập nhật mới nhất
                </p>

                {/* Search bar */}
                <div className="relative mt-6 max-w-xs mx-auto">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="bg-gray-100 text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button className="absolute text-sm right-2 top-1.5 rounded-lg bg-primary-400 text-white py-1 px-3 transition hover:bg-yellow-400">
                        Tìm
                    </button>
                </div>
            </div>

            {/* Blog grid and pagination */}
            <BlogGrid/>

            {/* Newsletter section */}
            <div className="mt-12 p-6 bg-primary-500 text-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold">Đăng ký nhận bản tin</h2>
                <p className="mt-4 text-sm">
                    Nhận thông báo về các bài viết mới nhất và cập nhật blog!
                </p>
                <div className="mt-4 flex">
                    <input
                        type="email"
                        placeholder="Nhập email của bạn"
                        className="px-4 py-2 rounded-l-lg w-full text-black focus:outline-none"
                    />
                    <button className="px-4 py-4 bg-yellow-400 text-gray-700 rounded-r-lg hover:bg-yellow-500 hover:text-white">
                        Gửi
                    </button>
                </div>
            </div>
        </Container>
    );
};

export default BlogPage;
