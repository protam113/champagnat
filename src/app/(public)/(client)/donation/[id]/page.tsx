'use client';

import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import formatDate from '@/utils/formatDate';
import Container from '@/app/components/Container/container';
import Image from 'next/image';
import { useDonateDetail } from '@/hooks/donate/useDonateDetail';

const Page = () => {
  const { id: blogIdParam } = useParams();
  const postId = Array.isArray(blogIdParam) ? blogIdParam[0] : blogIdParam;

  const { data: blog, isLoading, isError } = useDonateDetail(postId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
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
      <div className="flex flex-col gap-8 items-center">
        {/* detail */}
        <div className="flex flex-col gap-8 lg:w-3/5">
          <h1 className="text-24 font-semibold text-center">{blog.title}</h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm justify-center">
            <span>{formatDate(blog.created_date)}</span>
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
    </Container>
  );
};

export default Page;
