'use client';

import { useParams } from 'next/navigation';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import formatDate from '@/utils/formatDate';
import { useDocumentDetail } from '@/hooks/document/useDocumentDetail';
import BlogCommentsSection from '@/app/components/main/blog/comment/CommentsSection';
import Comment from '@/app/components/main/blog/comment/Comment';
import Container from '@/app/components/Container/container';
import Image from 'next/image';
import CategoryDoc from './CategoryDoc';
import { BsFillShareFill } from 'react-icons/bs';

const Page = () => {
  const { id: blogIdParam } = useParams();
  const postId = Array.isArray(blogIdParam) ? blogIdParam[0] : blogIdParam;

  const { data: blog, isLoading, isError } = useDocumentDetail(postId);

  if (isLoading) {
    return (
      <>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </>
    );
  }

  // Nếu có lỗi khi lấy dữ liệu, hiển thị thông báo lỗi
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Có lỗi xảy ra khi tải bài viết.</p>
      </div>
    );
  }

  // Nếu không tìm thấy blog, hiển thị thông báo
  if (!blog) {
    return <p className="text-gray-500">Không tìm thấy bài viết nào.</p>;
  }
  const handleShare = () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        message.success('Link copied successfully!');
      })
      .catch((err) => {
        // Handle errors if clipboard access fails
        console.error('Failed to copy the URL: ', err);
        alert('Failed to copy the link.');
      });
  };

  return (
    <Container>
      <div className="flex flex-col gap-8 items-center">
        {/* detail */}
        <div className="flex flex-col gap-8 lg:w-3/5">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-center">
            {blog.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm justify-center">
            <p className="text-blue-800">{blog.category.name}</p>
            <span>{formatDate(blog.created_date)}</span>
            <button
              onClick={handleShare}
              className="px-4 py-2 ml-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-primary-500 transition"
            >
              <BsFillShareFill />
            </button>
          </div>
          <div className="lg:text-16 flex flex-col gap-6 text-justify">
            <p>{blog.description}</p>
          </div>
        </div>

        {/* Image */}
        {blog.image && (
          <div className="mt-8 w-full max-w-3xl mx-auto">
            <Image
              src={blog.image}
              alt={blog.title}
              className="rounded-2xl object-cover"
              width={800}
              height={450}
            />
          </div>
        )}

        {/* content */}
        <div className="flex flex-col md:flex-row gap-12 justify-center">
          {/* text */}
          <div className="lg:text-lg flex flex-col gap-6 text-justify w-full md:w-3/5">
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: blog.content.replace(/\"/g, ''), // Xóa tất cả dấu "
              }}
            />
          </div>
        </div>
      </div>

      <CategoryDoc category={blog.category.id} />

      {/* Comments */}
      <Comment postId={blog.id} model="blog" />
      <BlogCommentsSection postId={blog.id} PostModel="blog" />
    </Container>
  );
};

export default Page;
