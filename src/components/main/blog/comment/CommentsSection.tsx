'use client';

import React, { useState } from 'react';
import { Avatar, Spin } from 'antd';
import formatDate from '@/utils/formatDate';
import { FaCommentDots, FaArrowLeft, FaArrowRight } from '@/lib/iconLib';
import { CommentList } from '@/lib/commentList';
import ReplyCommentSection from './ReplyCommentSection';
import ReplyComment from './ReplyCommen';

const BlogCommentsSection = ({
  postId,
  PostModel,
}: {
  postId: string;
  PostModel: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0);
  const [replyVisible, setReplyVisible] = useState<Record<number, boolean>>({});

  const object_id = postId;
  const model = PostModel;
  const { queueData, next, isLoading, isError } = CommentList({
    currentPage,
    filter: { object_id: [object_id], model: [model] },
    refreshKey,
  });

  const totalPages = next ? currentPage + 1 : currentPage;

  const toggleReply = (commentId: number) => {
    setReplyVisible((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const renderComment = () => {
    if (isError) {
      return (
        <p className="text-red-500">Đã có lỗi xảy ra khi tải bình luận.</p>
      );
    }

    if (queueData.length === 0 && isLoading) {
      return <Spin size="large" />;
    }

    if (queueData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center mt-4 space-y-2">
          <FaCommentDots className="text-5xl text-gray-400" />
          <p className="text-gray-500 text-lg font-semibold">
            Chưa có nội dung, hãy là người bình luận đầu tiên!
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {queueData.map((comment) =>
          comment && comment.user ? (
            <div key={comment.id}>
              <div className="flex  items-center  mb-2">
                <div className="flex">
                  <Avatar
                    className="mr-2 w-8 h-8 rounded-full"
                    src={comment.user.profile_image}
                    alt="avatar"
                  />
                  <p className="text-sm font-semibold text-black">
                    {comment.user.first_name} {comment.user.last_name}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDate(comment.created_date)}
                </p>
              </div>

              <p className="text-sm text-gray-800">{comment.content}</p>
              <button
                className="text-blue-500 text-sm mt-2"
                onClick={() => toggleReply(comment.id)}
              >
                {replyVisible[comment.id] ? 'Ẩn trả lời' : 'Trả lời'}
              </button>
              {replyVisible[comment.id] && (
                <div className="mt-2">
                  <ReplyCommentSection
                    postId={postId}
                    parentId={String(comment.id)}
                  />
                  <ReplyComment
                    postId={postId}
                    model={PostModel}
                    parent={String(comment.id)}
                  />
                </div>
              )}
              <hr className="my-2 border-gray-300" />
            </div>
          ) : null,
        )}
      </div>
    );
  };

  return (
    <div className="comments-section">
      {renderComment()}
      {/* Load More Button */}
      <div className="flex justify-center mt-8 items-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-6 h-6 text-10 bg-gray-200 rounded-full hover:bg-gray-300 ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FaArrowLeft />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-6 h-6 text-10 rounded-full hover:bg-gray-300 ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={!next}
          className={`flex items-center justify-center w-6 h-6 text-10 bg-gray-200 rounded-full hover:bg-gray-300 ${
            !next ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default BlogCommentsSection;
