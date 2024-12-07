'use client';

import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import formatDate from '@/utils/formatDate';
import { useBlogDetail } from '@/hooks/blog/useBlogDetail';
import Heading from '@/app/components/design/Heading';
import BlogCommentsSection from '@/app/components/main/blog/comment/CommentsSection';

const Page = () => {
  const { id: blogIdParam } = useParams();
  const postId = Array.isArray(blogIdParam) ? blogIdParam[0] : blogIdParam;

  const { data: blog, isLoading, isError } = useBlogDetail(postId);
  console.log('🚀 ~ Page ~ blog:', blog);
  console.log('Blog content field:', blog?.content);

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

  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {blog.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <p className="text-blue-800">{blog.user.username}</p>
            <span>on</span>
            <p className="text-blue-800">
              {blog.categories?.map((category) => category.name).join(', ')}
            </p>
            <span>{formatDate(blog.created_date)}</span>
          </div>
          <p className="text-gray-500 font-medium">Mô Tả</p>
          <div className="lg:text-lg flex flex-col gap-6 text-justify">
            <p>{blog.description}</p>
          </div>
        </div>
        {/* {blog.image && (
          <div className="hidden lg:block w-2/5">
            <Image
              src={blog.image || '/path/to/default-image.jpg'} // Fallback to a default image if null
              alt={blog.title}
              className="w-full h-48 object-cover"
              width={400} // Optionally specify width
              height={300} // Optionally specify height
            />
          </div>
        )} */}
      </div>
      {/* content */}
      <Heading name="Chi tiết bài viết" />

      <div className="flex flex-col md:flex-row gap-12 justify-between">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          {/* Sử dụng dangerouslySetInnerHTML để hiển thị HTML */}
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: blog.content.replace(/\"/g, ''), // Xóa tất cả dấu "
            }}
          />
        </div>
      </div>
      <div className="lg:text-14 ">
        <p className="text-gray-500 font-16">Nguồn:</p>

        <p>{blog.link}</p>
      </div>
      <BlogCommentsSection postId={blog.id} />
    </div>
  );
};

export default Page;
