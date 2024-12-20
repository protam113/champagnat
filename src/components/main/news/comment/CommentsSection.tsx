import React, { useState } from 'react';
import { Avatar, Spin, Button } from 'antd';
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
  const [currentPage, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const object_id = postId;
  const model = PostModel;

  const { queueData, isLoading, isError } = CommentList({
    currentPage,
    filter: { object_id: [object_id], model: [model] },
    refreshKey,
  });

  const loadNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const renderComment = () => {
    if (isError) {
      return (
        <p className="text-red-500 text-center">
          Đã có lỗi xảy ra khi tải bình luận.
        </p>
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
      <div className="space-y-6">
        {queueData.map((comment) =>
          comment && comment.user ? (
            <div
              key={comment.id}
              className="p-4 bg-white rounded-lg shadow-md transition-all hover:shadow-xl"
            >
              <div className="flex items-start space-x-4 mb-2">
                <Avatar
                  className="w-12 h-12 rounded-full"
                  src={comment.user.profile_image}
                  alt="avatar"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {comment.user.first_name} {comment.user.last_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(comment.created_date)}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-700">{comment.content}</p>

              {/* Reply section */}
              <div className="mt-3">
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

              <hr className="my-4 border-gray-300" />
            </div>
          ) : null,
        )}
      </div>
    );
  };

  return (
    <div className="comments-section space-y-8">
      {renderComment()}
      <div className="mt-6 text-center">
        <Button
          type="primary"
          onClick={loadNextPage}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Tải thêm
        </Button>
      </div>
    </div>
  );
};

export default BlogCommentsSection;
