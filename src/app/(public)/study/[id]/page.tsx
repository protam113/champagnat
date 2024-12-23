'use client';

import { useParams } from 'next/navigation';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import formatDate from '@/utils/formatDate';
import { useDocumentDetail } from '@/hooks/document/useDocumentDetail';
import Image from 'next/image';
import Link from 'next/link';
import { DocList } from '@/lib/docList';
import { BsFillShareFill } from 'react-icons/bs';
import Container from '@/components/Container/container';
import Tittle from '@/components/design/Tittle';
import Header from '@/components/design/Header';
import Comment from '@/components/main/blog/comment/Comment';
import BlogCommentsSection from '@/components/main/blog/comment/CommentsSection';

const Page = () => {
  const { id: documentIdParam } = useParams();
  const postId = Array.isArray(documentIdParam)
    ? documentIdParam[0]
    : documentIdParam;

  // Lấy chi tiết tài liệu
  const { data: document, isLoading, isError } = useDocumentDetail(postId);

  // Lấy tất cả tài liệu
  const {
    queueData: docs,
    isLoading: docsLoading,
    isError: docsError,
  } = DocList(1, '', 0);

  if (isLoading || docsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (isError || docsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">
          Có lỗi xảy ra khi tải tài liệu hoặc danh sách tài liệu.
        </p>
      </div>
    );
  }

  if (!document) {
    return <p className="text-gray-500">Không tìm thấy tài liệu nào.</p>;
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

  // Lọc các tài liệu liên quan
  const relatedDocs = docs.filter((relatedDoc) => {
    return (
      relatedDoc.id !== document?.id &&
      relatedDoc.categories?.some(
        (relatedCategory) =>
          document?.category && relatedCategory.id === document.category.id,
      )
    );
  });

  return (
    <Container>
      <div className="grid grid-cols-12 gap-8">
        {/* Tài liệu chi tiết (bên trái) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-24 font-semibold text-center">
              {document.title}
            </h1>

            <div className="text-center text-gray-500 text-sm">
              <span className="text-blue-800 mr-4 text-16">
                {document.category?.name}
              </span>
              <span>{formatDate(document.created_date)}</span>

              <button
                onClick={handleShare}
                className="px-4 py-2 ml-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-primary-500 transition"
              >
                <BsFillShareFill />
              </button>
            </div>

            <div className="text-center mt-2 text-16">
              <p>{document.description}</p>
            </div>

            {/* Image */}
            {document.image && (
              <div className="mt-8 w-full max-w-3xl mx-auto">
                <Image
                  src={document.image}
                  alt={document.title}
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
                __html: document.content.replace(/\"/g, ''), // Xóa tất cả dấu "
              }}
            />
            {/* Source */}
            <div className="mt-6 mb-6">
              <p className="text-gray-500 font-semibold">Nguồn:</p>
              <p className="text-blue-800">{document.link}</p>
            </div>
          </div>
        </div>

        {/* Các tài liệu gợi ý (bên phải) */}
        <div className="col-span-12 lg:col-span-4 lg:p-6">
          <div>
            <div className="mb-4">
              <Tittle name="Tài Liệu Liên Quan" />
            </div>
            <ul>
              {relatedDocs.slice(0, 5).map((relatedDoc, index) => (
                <li key={index} className="mb-4">
                  <Link href={`/document/${relatedDoc.id}`}>
                    <p className="text-16 border-b-2 pb-2 line-clamp-3 text-gray-700 transform transition-transform duration-300 hover:text-gray-500">
                      {relatedDoc.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-10">
            <div className="mb-4">
              <Tittle name="Tất Cả Tài Liệu" />
            </div>
            <ul>
              {docs.slice(0, 10).map((doc, index) => (
                <li key={index} className="mb-4">
                  <Link href={`/document/${doc.id}`}>
                    <p className="text-16 border-b-2 pb-2 line-clamp-3 text-gray-700 transform transition-transform duration-300 hover:text-gray-500">
                      {doc.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bình luận */}
      <Header name="Bình Luận" />
      <Comment postId={document.id} model="document" />
      <BlogCommentsSection postId={document.id} PostModel="document" />
    </Container>
  );
};

export default Page;
