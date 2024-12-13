'use client';

import React, { useState } from 'react';
import { Avatar, Spin } from 'antd';
import formatDate from '@/utils/formatDate';
import { FaCommentDots } from '@/lib/iconLib';
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

  const object_id = postId;
  const model = PostModel;
  const { queueData, next, isLoading, isError } = CommentList({
    currentPage,
    filter: { object_id: [object_id], model: [model] },
    refreshKey,
  });

  const renderComment = () => {
    if (isError) {
      return (
        <p className="text-red-500">Đã có lỗi xảy ra khi tải bình luận.</p>
      );
    }

    if (!queueData || queueData.length === 0) {
      return isLoading ? (
        <Spin size="large" />
      ) : (
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
      {/* Load More Button */}
      <div className="mt-4 text-center">
        {next && (
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="text-blue-500 hover:text-blue-300 text-sm px-6 py-3 rounded-md border border-blue-500 hover:border-blue-300 transition-all"
          >
            Tải Thêm
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogCommentsSection;
