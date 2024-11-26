"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { BlogList } from "@/lib/blogList";

const BlogGrid = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [refreshKey] = useState(0);

    const { queueData, isLoading, isError } = BlogList(currentPage, "", refreshKey);

    const handleNextPage = () => {
        if (queueData.length > 0) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    if (isLoading) {
        return <div className="text-center text-lg text-gray-500">Đang tải...</div>;
    }

    if (isError) {
        return <div className="text-center text-lg text-red-500">Có lỗi xảy ra khi tải bài viết.</div>;
    }

    return (
        <div>
            {/* Blog post grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {queueData.map((post) => (
                    <div key={post.id} className="border rounded-lg overflow-hidden shadow-lg">
                        {/* Use a fallback image if post.image is null */}
                        <Image
                            src={post.image || "/path/to/default-image.jpg"} // Fallback to a default image if null
                            alt={post.title}
                            className="w-full h-48 object-cover"
                            width={400} // Optionally specify width
                            height={300} // Optionally specify height
                        />
                        <div className="p-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500 uppercase font-semibold">
                                {/* Render categories if available */}
                                {Array.isArray(post.categories) ? (
                                    post.categories.map((category, index) => (
                                        <span key={index} className="inline-block">
                      {category.name}
                    </span>
                                    ))
                                ) : (
                                    <span>{post.categories}</span>
                                )}
                            </div>
                            <h2 className="text-xl line-clamp-2 font-semibold text-gray-800 mt-2">
                                {post.title}
                            </h2>
                            <Link href={`/blog/${post.id}`} passHref>
                                <div className="text-primary-500 mt-4 inline-block transition hover:text-primary-600">
                                    Đọc tiếp
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Pagination controls */}
            <div className="flex justify-center mt-8 items-center space-x-2">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center w-6 h-6 text-10 bg-gray-200 rounded-full hover:bg-gray-300 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    <FaArrowLeft />
                </button>

                {/* Show current page */}
                <span className="text-lg font-semibold">{currentPage}</span>

                <button
                    onClick={handleNextPage}
                    disabled={queueData.length === 0 || queueData.length < 10} // Assuming each page returns 10 posts
                    className={`flex items-center justify-center w-6 h-6 text-10 bg-gray-200 rounded-full hover:bg-gray-300 ${queueData.length === 0 || queueData.length < 10 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default BlogGrid;
