import React, { useMemo } from 'react';
import formatDate from '@/utils/formatDate';
import { DonateList } from '@/lib/donateList';
import DonateProb from '../../donation/donateProb';
import Container from '@/components/Container/container';
import SkeletonCard from '@/components/Skeleton/SkeletonCard';
import { NotiPostNull, NotiPostError } from '@/components/design/index';

export const Donation = () => {
  // Lấy danh sách tin tức từ API
  const { queueData: blogs, isLoading, isError, count } = DonateList(1, '', 0);
  const skeletonCount = 6;
  const dataSource = useMemo(() => blogs, [blogs]);

  // Kiểm tra dữ liệu
  if (isError) return <NotiPostError />;

  if (!isLoading && count === 0) return <NotiPostNull />;

  const latestPosts = dataSource?.slice(0, 4) || [];

  return (
    <>
      <Container>
        <div className="py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5">
            {isLoading
              ? Array(skeletonCount)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />) // Hiển thị skeletons
              : latestPosts.map((blog, index) => (
                  <DonateProb
                    key={index}
                    id={blog.id}
                    title={blog.title}
                    description={blog.description}
                    date={formatDate(blog.created_date)}
                    image={blog.image}
                  />
                ))}
          </div>
        </div>
      </Container>
    </>
  );
};
