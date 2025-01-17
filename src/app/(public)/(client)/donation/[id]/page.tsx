'use client';

import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import { useDonateDetail } from '@/hooks/donate/useDonateDetail';
import Container from '@/components/Container/container';
import BackButton from '@/components/button/BackButton';
import PostDetailSkeleton from '@/components/Skeleton/PostDetailSkeleton';
import { NotiPostError } from '@/components/design/index';

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
    return <NotiPostError />;
  }

  if (!blog) {
    return <p className="text-gray-500">Không tìm thấy bài viết nào.</p>;
  }

  return (
    <Container>
      <BackButton />
      {isLoading ? (
        <PostDetailSkeleton />
      ) : (
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

          {/* pdf or image */}
          <div className="text-blue-800 mr-4 text-16">
            {blog.media?.map((media) => {
              if (media.file_type === 'PDF') {
                return (
                  <iframe
                    key={media.id} // Thêm key cho mỗi phần tử
                    src={media.file}
                    width="100%" // Bạn có thể điều chỉnh chiều rộng của iframe
                    height="600px" // Bạn có thể điều chỉnh chiều cao của iframe"
                    title="PDF Viewer"
                  />
                );
              } else if (media.file_type === 'IMAGE') {
                return (
                  <div key={media.id} className="w-full">
                    <Image
                      src={media.file}
                      alt={blog.title}
                      className=" object-cover"
                      width={800}
                      height={450}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </Container>
  );
};

export default Page;
