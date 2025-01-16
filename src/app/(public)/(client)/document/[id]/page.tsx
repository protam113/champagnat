'use client';

import { useParams } from 'next/navigation';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import Container from '@/components/Container/container';
import { BsFillShareFill } from 'react-icons/bs';
import { useDocumentDetail } from '@/hooks/document/useDocumentDetail';

const Page = () => {
  const { id: docIdParam } = useParams();
  const postId = Array.isArray(docIdParam) ? docIdParam[0] : docIdParam;
  const { data: doc, isLoading, isError } = useDocumentDetail(postId);

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

  if (!doc) {
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
        alert('Failed to copy the link.');
      });
  };

  return (
    <Container>
      <div className="grid grid-cols-12 gap-8">
        {/* Sứ vụ chi tiết (bên trái) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-24 font-semibold text-center">{doc.title}</h1>

            <div className="flex items-center justify-center text-gray-500 text-sm">
              <p className="mr-4">
                {doc.user.first_name} {doc.user.last_name}
              </p>
              <span className="text-blue-800 mr-4 text-16">
                {doc.category.name}
              </span>
              <span>{formatDate(doc.created_date)}</span>

              <button
                onClick={handleShare}
                className="px-4 py-2 ml-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-primary-500 transition"
              >
                <BsFillShareFill />
              </button>
            </div>

            <div className="text-center mt-2 text-16">
              <p>{doc.description}</p>
            </div>

            {/* Image */}
            {doc.image && (
              <div className="mt-8 w-full max-w-3xl mx-auto">
                <Image
                  src={doc.image}
                  alt={doc.title}
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
                __html: doc.content.replace(/\"/g, ''), // Xóa tất cả dấu "
              }}
            />

            {/* pdf or image */}
            <div className="text-blue-800 mr-4 text-16">
              {doc.media?.map((media) => {
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
                        alt={doc.title}
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
              <p className="text-blue-800">{doc.link}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
