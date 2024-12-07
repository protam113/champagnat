'use client';

import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNewsDetail } from '@/hooks/news/useNewsDetail';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import Container from '@/app/components/Container/container';

const Page = () => {
  const { id: blogIdParam } = useParams();
  const postId = Array.isArray(blogIdParam) ? blogIdParam[0] : blogIdParam;

  const { data: blog, isLoading, isError } = useNewsDetail(postId);

  if (isLoading) {
    return (
      <>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Có lỗi xảy ra khi tải bài viết.</p>
      </div>
    );
  }

  if (!blog) {
    return <p className="text-gray-500">Không tìm thấy bài viết nào.</p>;
  }

  return (
    <Container>
      <div className="flex flex-col gap-8">
        {/* detail */}
        <div className="flex flex-col gap-4">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold text-center">
            {blog.title}
          </h1>

          <div className=" text-center text-gray-500 text-sm">
            <span className="text-blue-800 mr-4 text-16">
              {blog.categories?.map((category) => category.name).join(', ')}
            </span>
            <span>{formatDate(blog.created_date)}</span>
          </div>

          <div className="text-center mt-2 text-16">
            <p>{blog.description}</p>
          </div>

          {/* Image */}
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
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8 mt-12">
          <h2 className="text-2xl font-semibold">Chi tiết bài viết</h2>
          <div
            className="content text-lg text-justify"
            dangerouslySetInnerHTML={{
              __html: blog.content.replace(/\"/g, ''), // Xóa tất cả dấu "
            }}
          />

          {/* Source */}
          <div className="mt-6">
            <p className="text-gray-500 font-semibold">Nguồn:</p>
            <p className="text-blue-800">{blog.link}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
