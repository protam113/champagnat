'use client';

import { useParams } from 'next/navigation';
import { message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import formatDate from '@/utils/formatDate';
import { useBlogDetail } from '@/hooks/blog/useBlogDetail';
import Image from 'next/image';
import Link from 'next/link';
import { BlogList } from '@/lib/blogList';
import { BsFillShareFill } from 'react-icons/bs';
import Container from '@/components/Container/container';
import Tittle from '@/components/design/Tittle';
import Header from '@/components/design/Header';
import Comment from '@/components/main/blog/comment/Comment';
import BlogCommentsSection from '@/components/main/blog/comment/CommentsSection';

const Page = () => {
  const { id: blogIdParam } = useParams();
  const postId = Array.isArray(blogIdParam) ? blogIdParam[0] : blogIdParam;

  const { data: blog, isLoading, isError } = useBlogDetail(postId);
  const { queueData: blogs } = BlogList(1, '', 0);

  const relatedBlogs = blogs.filter((relatedPost) => {
    return (
      relatedPost.id !== blog?.id &&
      relatedPost.categories.some((relatedCategory) =>
        blog?.categories.some((category) => category.id === relatedCategory.id),
      )
    );
  });

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
        {/* Bài viết chi tiết (bên trái) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-24 font-semibold text-center">{blog.title}</h1>

            <div className="text-center text-gray-500 text-sm">
              <span className="text-blue-800 mr-4 text-16">
                {blog.categories?.map((category) => category.name).join(', ')}
              </span>
              <span>{formatDate(blog.created_date)}</span>

              <button
                onClick={handleShare}
                className="px-4 py-2 ml-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-primary-500 transition"
              >
                <BsFillShareFill />
              </button>
            </div>

            <div className="text-center mt-2 text-16">
              <p>{blog.description}</p>
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
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8 mt-12">
            <div
              className="content text-lg text-justify"
              dangerouslySetInnerHTML={{
                __html: blog.content.replace(/\"/g, ''), // Xóa tất cả dấu "
              }}
            />
            {/* Source */}
            <div className="mt-6 mb-6">
              <p className="text-gray-500 font-semibold">Nguồn:</p>
              <p className="text-blue-800">{blog.link}</p>
            </div>
          </div>
        </div>

        {/* Các bài viết gợi ý (bên phải) */}
        <div className=" col-span-12 lg:col-span-4  p-6 ">
          <div>
            <div className=" mb-4">
              <Tittle name="Bài Viết Liên Quan" />
            </div>
            <ul>
              {relatedBlogs.slice(0, 5).map((relatedPost, index) => (
                <li key={index} className="mb-4">
                  <Link href={`/new/${relatedPost.id}`}>
                    <p className="text-16 border-b-2 pb-2 line-clamp-3 text-gray-700 transform transition-transform duration-300 hover:text-gray-500">
                      {relatedPost.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-10">
            <div className=" mb-4">
              <Tittle name="Tất Cả Bài Viết" />
            </div>
            <ul>
              {blogs.slice(0, 10).map((allPost, index) => (
                <li key={index} className="mb-4">
                  <Link href={`/new/${allPost.id}`}>
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
      <Header name="Bình Luận" />
      <Comment postId={blog.id} model="blog" />
      <BlogCommentsSection postId={blog.id} PostModel="blog" />
    </Container>
  );
};

export default Page;
