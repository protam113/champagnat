'use client';

import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import { useEventDetail } from '@/hooks/event/useEventDetail';
import Container from '@/components/Container/container';
import EventRegister from '@/components/main/projects/eventRegister';
import { NotiPostError } from '@/components/design/index';
import PostDetailSkeleton from '@/components/Skeleton/PostDetailSkeleton';

const Page = () => {
  const { id: blogIdParam } = useParams();
  const postId = Array.isArray(blogIdParam) ? blogIdParam[0] : blogIdParam;

  const { data: blog, isLoading, isError } = useEventDetail(postId);

  if (isLoading) {
    return (
      <>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </>
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
      {isLoading ? (
        <PostDetailSkeleton />
      ) : (
        <div className="flex flex-col gap-8">
          {/* detail */}
          <div className="flex flex-col gap-4">
            <h1 className="text-24 font-semibold text-center">{blog.title}</h1>

            <div className=" text-center text-gray-500 text-sm">
              {/* <span className="text-blue-800 mr-4 text-16">
              {blog.categories?.map((category) => category.name).join(', ')}
            </span> */}
              <span>{formatDate(blog.created_date)}</span>
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
                __html: blog.description.replace(/\"/g, ''), // Xóa tất cả dấu "
              }}
            />
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
      <EventRegister eventId={postId} />
    </Container>
  );
};

export default Page;
