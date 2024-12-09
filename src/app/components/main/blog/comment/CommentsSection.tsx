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

  // Đặt object_id và model theo blogId để xác định đúng bài viết
  const object_id = postId; // Dùng blogId làm object_id
  const model = PostModel;
  // Gọi CommentList với các tham số cần thiết
  const { queueData, next, isLoading, isError } = CommentList({
    currentPage,
    filter: { object_id: [object_id], model: [model] },
    refreshKey,
  });

  const renderComment = () => {
    if (isError) {
      return (
        <p className="text-red-500">Đã có lỗi xảy ra khi tải bình luận.</p>
      ); // Error message
    }

    if (!queueData || queueData.length === 0) {
      return isLoading ? (
        <Spin size="large" />
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-4 space-y-2">
          <FaCommentDots className="text-5xl text-gray-400" />{' '}
          {/* Biểu tượng */}
          <p className="text-gray-500 text-lg font-semibold">
            Chưa có nội dung, hãy là người bình luận đầu tiên!
          </p>
        </div>
      );
    }
    const totalPages = next ? currentPage + 1 : currentPage;

    return (
      <div className="space-y-4">
        {queueData.map((comment) =>
          comment && comment.user ? (
            <div key={comment.id} className="mb-4">
              <div className="flex items-start mb-2">
                <div className="flex items-center">
                  <p className="inline-flex items-center mr-3 text-sm font-semibold text-black">
                    <Avatar
                      className="mr-2 w-6 h-6 rounded-full"
                      src={comment.user.profile_image}
                      alt="avatar"
                    />{' '}
                    {comment.user.first_name} {comment.user.last_name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(comment.created_date)}
                  </p>
                </div>
              </div>

              <p className="text-sm text-black">{comment.content}</p>
              <br />
              <div className="flex items-center space-x-2"></div>
              <ReplyCommentSection
                postId={postId}
                parentId={String(comment.id)}
              />
              <ReplyComment
                postId={postId}
                model={PostModel}
                parent={String(comment.id)}
              />
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
      <div className="mt-4 text-center">
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="text-blue-500 hover:text-blue-300 text-sm px-4 py-2 rounded"
        >
          Tải Thêm
        </button>
      </div>
    </div>
  );
};

export default BlogCommentsSection;
