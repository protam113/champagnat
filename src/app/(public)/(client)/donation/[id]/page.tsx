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
        <div className="flex flex-col gap-8">
          {/* detail */}
          <div className="flex flex-col gap-4">
            <h1 className="text-24 font-semibold text-center">{blog.title}</h1>
            <div className="flex items-center gap-2 text-gray-400 text-sm justify-center">
              <span>{formatDate(blog.created_date)}</span>
            </div>
            <div className="lg:text-16 flex flex-col gap-6 text-center">
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
            <div className="flex flex-wrap -mx-2">
              {blog.media?.map((media) => {
                if (media.file_type === 'PDF') {
                  return (
                    <div key={media.id} className="w-full mb-4">
                      <iframe
                        src={media.file}
                        width="100%"
                        height="600px"
                        title="PDF Viewer"
                      />
                    </div>
                  );
                } else if (media.file_type === 'IMAGE') {
                  const imageCount = blog.media.filter(
                    (item) => item.file_type === 'IMAGE',
                  ).length; // Đếm số lượng hình ảnh
                  const isSingleImage = imageCount === 1;

                  return (
                    <div
                      key={media.id}
                      className={`${isSingleImage ? 'w-full' : 'w-1/2'} px-2 mb-4`}
                    >
                      {isSingleImage ? (
                        <Image
                          src={media.file}
                          alt={blog.title}
                          className="object-cover"
                          width={800}
                          height={450}
                        />
                      ) : (
                        <div
                          className="relative overflow-hidden"
                          style={{ height: '250px' }} // Chiều cao cố định khi có nhiều hình
                        >
                          <Image
                            src={media.file}
                            alt={blog.title}
                            className="object-cover"
                            layout="fill"
                          />
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Page;
