import React from 'react';
import formatDate from '@/utils/formatDate';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { NotiPostNull, NotiPostError } from '@/components/design/index';
import { DocList } from '@/lib/docList';
import DocProb from '../../document/DocProb';

export const TuLieu = () => {
  // Lấy danh sách tin tức từ API
  const { queueData: blogs, isLoading, isError, count } = DocList(1, '', 0);
  const skeletonCount = 6;

  if (isError) return <NotiPostError />;

  if (!isLoading && count === 0) return <NotiPostNull />;

  const latestPosts = blogs?.slice(0, 6) || [];

  return (
    <>
      <div className="py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5">
          {isLoading
            ? Array(skeletonCount)
                .fill(0)
                .map((_, index) => <SkeletonCard key={index} />) // Hiển thị skeletons
            : latestPosts.map((blog, index) => (
                <DocProb
                  key={index}
                  id={blog.id}
                  title={blog.title}
                  description={blog.description}
                  date={formatDate(blog.created_date)}
                  author={blog.user.username}
                  category={blog.category.name}
                  image={blog.image}
                />
              ))}
        </div>
      </div>
    </>
  );
};
