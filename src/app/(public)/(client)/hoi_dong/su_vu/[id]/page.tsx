'use client';

import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import Link from 'next/link';
import { useMissionDetail } from '@/hooks/misssion/useMissionDetail';
import { MissionList } from '@/lib/missionList';
import Container from '@/components/Container/container';
import Tittle from '@/components/design/Tittle';

const Page = () => {
  const { id: suvuIdParam } = useParams();
  const postId = Array.isArray(suvuIdParam) ? suvuIdParam[0] : suvuIdParam;

  const { data: suvu, isLoading, isError } = useMissionDetail(postId);
  const { queueData: missions } = MissionList(1, '', 0);

  const relatedMissions = missions.filter((relatedPost) => {
    // Kiểm tra xem có danh mục trùng với sứ vụ hiện tại không
    // Đồng thời kiểm tra bài viết không phải là bài hiện tại (so sánh ID)
    return (
      relatedPost.id !== suvu?.id &&
      relatedPost.category &&
      suvu?.category &&
      relatedPost.category.id === suvu.category.id // So sánh category của sứ vụ và bài viết liên quan
    );
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Có lỗi xảy ra khi tải bài viết.</p>
      </div>
    );
  }

  if (!suvu) {
    return <p className="text-gray-500">Không tìm thấy sứ vụ nào.</p>;
  }

  return (
    <Container>
      <div className="grid grid-cols-12 gap-8">
        {/* Sứ vụ chi tiết (bên trái) */}
        <div className="col-span-12 lg:col-span-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-24 font-semibold text-center">{suvu.title}</h1>

            <div className="text-center text-gray-500 text-sm">
              <span className="text-blue-800 mr-4 text-16">
                {suvu.category.name}
                {/* Chỉ hiển thị danh mục đầu tiên */}
              </span>
              <span>{formatDate(suvu.created_date)}</span>
            </div>

            <div className="text-center mt-2 text-16">
              <p>{suvu.description}</p>
            </div>

            {/* Image */}
            {suvu.image && (
              <div className="mt-8 w-full max-w-3xl mx-auto">
                <Image
                  src={suvu.image}
                  alt={suvu.title}
                  className="rounded-2xl object-cover"
                  width={800}
                  height={450}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8 mt-12">
            <div
              className="content text-lg text-justify"
              dangerouslySetInnerHTML={{
                __html: suvu.content.replace(/\"/g, ''), // Xóa tất cả dấu "
              }}
            />

            {/* Source */}
            <div className="mt-6">
              <p className="text-gray-500 font-semibold">Nguồn:</p>
              <p className="text-blue-800">{suvu.link}</p>
            </div>
          </div>
        </div>

        {/* Các sứ vụ liên quan (bên phải) */}
        <div className="col-span-12 lg:col-span-4 p-6">
          <div>
            <div className="mb-4">
              <Tittle name="Sứ Vụ Liên Quan" />
            </div>
            <ul>
              {relatedMissions.slice(0, 5).map((relatedPost, index) => (
                <li key={index} className="mb-4">
                  <Link href={`/mission/${relatedPost.id}`}>
                    <p className="text-16 border-b-2 pb-1 line-clamp-3 text-gray-700 transform transition-transform duration-300 hover:text-gray-500">
                      {relatedPost.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-10">
            <div className="mb-4">
              <Tittle name="Tất Cả Sứ Vụ" />
            </div>
            <ul>
              {missions.slice(0, 10).map((allPost, index) => (
                <li key={index} className="mb-4">
                  <Link href={`/mission/${allPost.id}`}>
                    <p className="text-16 border-b-2 pb-1 line-clamp-3 text-gray-700 transform transition-transform duration-300 hover:text-gray-500">
                      {allPost.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Page;
