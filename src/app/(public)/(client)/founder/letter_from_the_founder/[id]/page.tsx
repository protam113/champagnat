'use client';

import { useParams } from 'next/navigation';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import Container from '@/components/Container/container';
import { BsFillShareFill } from 'react-icons/bs';
import { useMessageDetail } from '@/hooks/message/useMessageDetail';
import BackButton from '@/components/button/BackButton';
import { MessageList } from '@/lib/messageList';
import Tittle from '@/components/design/Tittle';
import Link from 'next/link';
import { NotiPostError } from '@/components/design/index';
import PostDetailSkeleton from '@/components/Skeleton/PostDetailSkeleton';

const Page = () => {
  const { id: suvuIdParam } = useParams();
  const postId = Array.isArray(suvuIdParam) ? suvuIdParam[0] : suvuIdParam;
  const { data: suvu, isLoading, isError } = useMessageDetail(postId);
  const { queueData } = MessageList(1, 0);

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

  if (!suvu) {
    return <p className="text-gray-500">Không tìm thấy sứ vụ nào.</p>;
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
      });
  };

  return (
    <Container>
      <BackButton />

      <div className="grid grid-cols-12 gap-8">
        {isLoading ? (
          <PostDetailSkeleton />
        ) : (
          <div className="col-span-12 lg:col-span-8">
            {/* Sứ vụ chi tiết (bên trái) */}
            <div className="col-span-12 lg:col-span-8">
              <div className="flex flex-col gap-4">
                <h1 className="text-24 font-semibold text-center">
                  {suvu.title}
                </h1>

                <div className="flex items-center justify-center text-gray-500 text-sm">
                  <p className="mr-4">
                    {suvu?.user?.first_name} {suvu?.user?.last_name}
                  </p>

                  <span>{formatDate(suvu.created_date)}</span>

                  <button
                    onClick={handleShare}
                    className="px-4 py-2 ml-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-primary-500 transition"
                  >
                    <BsFillShareFill />
                  </button>
                </div>

                <div className="text-center mt-2 text-16">
                  <p>{suvu.description}</p>
                </div>

                {/* Image */}
                {suvu.image && (
                  <div className="mt-8 w-full max-w-3xl mx-auto">
                    <Image
                      src={suvu.image}
                      alt={suvu.title}
                      className="rounded-2xl object-cover"
                      width={800}
                      height={450}
                    />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-8 mt-12">
                <div
                  className="content text-lg text-justify"
                  dangerouslySetInnerHTML={{
                    __html: suvu.content.replace(/\"/g, ''), // Xóa tất cả dấu "
                  }}
                />

                {/* pdf or image */}
                <div className="text-blue-800 mr-4 text-16">
                  {suvu.media?.map((media) => {
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
                            alt={suvu.title}
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

                {/* Source */}
                <div className="mt-6">
                  <p className="text-gray-500 font-semibold">Nguồn:</p>
                  <p className="text-blue-800">{suvu.link}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className=" col-span-12 lg:col-span-4  p-6 ">
          <div className="pt-10">
            <div className=" mb-4">
              <Tittle name="Tất Cả Thư" />
            </div>
            <ul>
              {queueData.slice(0, 10).map((allPost, index) => (
                <li key={index} className="mb-4">
                  <Link href={`/founder/letter_from_the_founder/${allPost.id}`}>
                    <p className="text-16 border-b-2 pb-2 line-clamp-3 text-gray-700 transform transition-transform duration-300 hover:text-gray-500">
                      {allPost.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
