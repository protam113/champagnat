'use client';

import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNewsDetail } from '@/hooks/news/useNewsDetail';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import Container from '@/app/components/Container/container';
import { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { LucideMessageCircleReply } from 'lucide-react';
import BlogCommentsSection from '@/app/components/main/blog/comment/CommentsSection';

interface Reply {
  text: string;
  createdAt: string;
}

interface Comment {
  text: string;
  createdAt: string;
  replies: Reply[]; // Mảng các trả lời của bình luận
}

// import { useBlogDetail } from '@/hooks/blog/useBlogDetail';
// import Heading from '@/app/components/design/Heading';
// import BlogCommentsSection from '@/app/components/main/blog/comment/CommentsSection';

const Page = () => {
  const { id: blogIdParam } = useParams();
  const postId = Array.isArray(blogIdParam) ? blogIdParam[0] : blogIdParam;

  const { data: blog, isLoading, isError } = useNewsDetail(postId);

  // State để quản lý bình luận
  const [comment, setComment] = useState(''); // Bình luận chung
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCommenting, setIsCommenting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<number[]>([]); // Quản lý các bình luận đang trả lời
  const [replyContent, setReplyContent] = useState<string>(''); // Quản lý nội dung trả lời riêng biệt

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Vui lòng nhập bình luận.');
      return;
    }

    try {
      setIsCommenting(true);

      // Giả lập gửi bình luận, bạn cần thay thế bằng API thật
      const newComment = {
        text: comment,
        createdAt: new Date().toISOString(),
        replies: [], // Mảng chứa các bình luận trả lời
      };

      setComments([...comments, newComment]);
      setComment('');
      setError(null);
    } catch {
      setError('Có lỗi xảy ra khi gửi bình luận.');
    } finally {
      setIsCommenting(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent, parentId: number) => {
    e.preventDefault();
    if (!replyContent.trim()) {
      setError('Vui lòng nhập trả lời.');
      return;
    }

    try {
      setIsCommenting(true);

      // Tìm bình luận gốc và thêm trả lời
      const updatedComments = [...comments];
      const commentToReply = updatedComments.find(
        (_, index) => index === parentId,
      );
      if (commentToReply) {
        commentToReply.replies.push({
          text: replyContent,
          createdAt: new Date().toISOString(),
        });
      }

      setComments(updatedComments);
      setReplyContent(''); // Reset reply content
      setError(null);
    } catch {
      setError('Có lỗi xảy ra khi gửi trả lời.');
    } finally {
      setIsCommenting(false);
      setReplyingTo((prev) => prev.filter((id) => id !== parentId));
    }
  };

  const handleDeleteComment = (index: number) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
  };

  const handleDeleteReply = (commentIndex: number, replyIndex: number) => {
    const updatedComments = [...comments];
    updatedComments[commentIndex].replies.splice(replyIndex, 1); // Xóa trả lời tại replyIndex
    setComments(updatedComments);
  };

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

        {/* Comment Section */}
        <div className="mt-12">
          <h3 className="text-24 font-semibold mb-4">Bình luận</h3>

          {/* Displaying comments */}
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment, commentIndex) => (
                <div key={commentIndex} className=" border-b pb-4">
                  <p className="text-gray-800">{comment.text}</p>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">
                      {formatDate(comment.createdAt)}
                    </span>

                    {/* Reply Button */}
                    <button
                      className="mt-2 text-primary-500 hover:text-blue-500"
                      onClick={
                        () => setReplyingTo((prev) => [...prev, commentIndex]) // Sử dụng mảng thay vì Set
                      }
                    >
                      <LucideMessageCircleReply />
                    </button>

                    {/* Delete Button */}
                    <button
                      className="mt-2 text-red-500 ml-2 hover:text-red-700"
                      onClick={() => handleDeleteComment(commentIndex)}
                    >
                      <MdOutlineDelete size={25} />
                    </button>
                  </div>

                  {/* Reply Form */}
                  {replyingTo.includes(commentIndex) && (
                    <form
                      onSubmit={(e) => handleReplySubmit(e, commentIndex)}
                      className="mt-4"
                    >
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                        placeholder="Thêm trả lời..."
                        rows={3}
                      ></textarea>
                      <button
                        type="submit"
                        className="w-max bg-primary-500 text-white py-2 px-2 rounded-md mt-4 hover:bg-primary-600 transition duration-200"
                      >
                        Gửi trả lời
                      </button>
                    </form>
                  )}

                  {/* Display Replies */}
                  {comment.replies.length > 0 && (
                    <div className="ml-8 mt-4">
                      {comment.replies.map((reply, replyIndex) => (
                        <div key={replyIndex} className="border-b pb-2">
                          <p className="text-gray-600">{reply.text}</p>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500">
                              {formatDate(reply.createdAt)}
                            </span>

                            {/* Reply Delete Button */}
                            <button
                              className=" text-red-500 ml-2 hover:text-red-700"
                              onClick={() =>
                                handleDeleteReply(commentIndex, replyIndex)
                              }
                            >
                              <MdOutlineDelete size={25} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Chưa có bình luận nào.</p>
          )}

          {/* Form to submit comment */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Thêm bình luận..."
              rows={4}
            ></textarea>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
              type="submit"
              className="w-max bg-primary-500 text-white py-2 px-2 rounded-md mt-4 hover:bg-primary-600 transition duration-200"
              disabled={isCommenting}
            >
              {isCommenting ? 'Đang gửi...' : 'Gửi bình luận'}
            </button>
          </form>
        </div>
      </div>
      <BlogCommentsSection postId={blog.id} />
    </Container>
  );
};

export default Page;
