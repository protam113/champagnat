'use client';

import React, { useState } from 'react';
import { Avatar, Spin } from 'antd';
import formatDate from '@/utils/formatDate';
import { CommentList } from '@/lib/commentList';

const ReplyCommentSection = ({
  postId,
  parentId,
  model,
}: {
  postId: string;
  parentId: string;
  model: string;
}) => {
  const [currentPage] = useState(1);
  const [refreshKey] = useState(0);

  const object_id = postId;
  const postmodel = model;
  const parent_id = parentId; // Sửa lại thành dấu "="

  // Gọi CommentList với các tham số cần thiết
  const { queueData, isLoading, isError } = CommentList({
    currentPage,
    filter: {
      object_id: [object_id],
      model: [postmodel],
      parent_id: parent_id,
    },
    refreshKey,
  });

  if (isError) {
    return <p className="text-red-500">Đã có lỗi xảy ra khi tải bình luận.</p>;
  }

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div className="space-y-4">
      {queueData.map((comment) =>
        comment && comment.user ? (
          <div
            key={comment.id}
            className="ml-10 pl-4 border-l-2 border-gray-300 mt-4"
          >
            <div className="flex items-start mb-2">
              <Avatar
                src={comment.user.profile_image}
                alt="profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold text-sm text-black">
                  {comment.user.first_name} {comment.user.last_name}
                </p>
                <p className="text-gray-500 text-xs">
                  {formatDate(comment.created_date)}
                </p>
              </div>
            </div>

            <p className="ml-10 text-black">{comment.content}</p>

            <hr className="my-2 border-gray-300" />
          </div>
        ) : null,
      )}
    </div>
  );
};

export default ReplyCommentSection;
