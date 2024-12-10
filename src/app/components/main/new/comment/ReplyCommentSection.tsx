'use client';

import React, { useState } from 'react';
import { Avatar, Spin } from 'antd';
import formatDate from '@/utils/formatDate';
import { CommentList } from '@/lib/commentList';
import { FaCommentDots } from '@/lib/iconLib';

const NewsReplyCommentSection = ({
  postId,
  parentId,
}: {
  postId: string;
  parentId: string;
}) => {
  const [currentPage, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const object_id = postId;
  const model = 'news';
  const parent_id = parentId; // Sửa lại thành dấu "="

  // Gọi CommentList với các tham số cần thiết
  const { queueData, isLoading, isError } = CommentList({
    currentPage,
    filter: { object_id: [object_id], model: [model], parent_id: parent_id },
    refreshKey,
  });

  const loadNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  if (isError) {
    return <p className="text-red-500">Đã có lỗi xảy ra khi tải bình luận.</p>;
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
            <div className="mt-4 text-center">
              <button
                onClick={loadNextPage}
                className="text-blue-500 hover:text-blue-300 text-sm px-4 py-2 rounded"
              >
                Tải Thêm
              </button>
            </div>
          </div>
        ) : null,
      )}
    </div>
  );
};

export default NewsReplyCommentSection;
