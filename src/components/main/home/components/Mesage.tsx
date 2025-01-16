import React, { useMemo } from 'react';
import formatDate from '@/utils/formatDate';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { NotiPostNull, NotiPostError } from '@/components/design/index';
import MessageProb from '../../message/messageProb';
import { MessageList } from '@/lib/messageList';

const MessageFounder = () => {
  // Lấy danh sách tin tức từ API
  const { queueData: blogs, isLoading, isError, count } = MessageList(1, 0);
  const dataSource = useMemo(() => blogs, [blogs]);

  // Số lượng skeleton hiển thị khi đang tải
  const skeletonCount = 6;

  // Xử lý trạng thái lỗi
  if (isError) return <NotiPostError />;

  if (!isLoading && count === 0) return <NotiPostNull />;

  // Lấy bài viết mới nhất
  const latestPosts = dataSource?.slice(0, 6) || [];

  return (
    <div className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading
          ? Array(skeletonCount)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />) // Hiển thị skeletons
          : latestPosts.map((blog) => (
              <MessageProb
                key={blog.id}
                id={blog.id}
                title={blog.title}
                description={blog.description}
                date={formatDate(blog.created_date)}
                author={blog.user.username}
                image={blog.image}
              />
            ))}
      </div>
    </div>
  );
};

export default MessageFounder;
