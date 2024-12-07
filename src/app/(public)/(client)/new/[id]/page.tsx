'use client';

import { useParams } from 'next/navigation';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNewsDetail } from '@/hooks/news/useNewsDetail';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import NewsCommentsSection from '@/app/components/main/new/comment/CommentsSection';

const Page = () => {
  const { id: blogIdParam } = useParams();
  const postId = Array.isArray(blogIdParam) ? blogIdParam[0] : blogIdParam;

  const { data: blog, isLoading, isError } = useNewsDetail(postId);

  if (isLoading) {
    return (
      <>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </>
    );
  }

  // Nếu có lỗi khi lấy dữ liệu, hiển thị thông báo lỗi
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Có lỗi xảy ra khi tải bài viết.</p>
      </div>
    );
  }

  // Nếu không tìm thấy blog, hiển thị thông báo
  if (!blog) {
    return <p className="text-gray-500">Không tìm thấy bài viết nào.</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {blog.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <p className="text-blue-800">{blog.user.username}</p>
            <span>on</span>
            <p className="text-blue-800">
              {blog.categories?.map((category) => category.name).join(', ')}
            </p>
            <span>{formatDate(blog.created_date)}</span>
          </div>
          <p className="text-gray-500 font-medium">Mo ta</p>
          <div className="lg:text-lg flex flex-col gap-6 text-justify">
            <p>{blog.description}</p>
          </div>
        </div>
        {blog.image && (
          <div className="hidden lg:block w-2/5">
            <Image
              src={blog.image}
              alt={blog.title}
              className="rounded-2xl"
              width={600}
              height={400}
            />
          </div>
        )}
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-12 justify-between">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          <div
            className="content"
            dangerouslySetInnerHTML={{
              __html: blog.content.replace(/\"/g, ''), // Xóa tất cả dấu "
            }}
          />
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {/* {data.user.img && (
              <Image
                src={data.user.img}
                className="w-12 h-12 rounded-full object-cover"
                w="48"
                h="48"
              />
            )} */}
              Image
              {/* <Link className="text-blue-800">{data.user.username}</Link> */}
            </div>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur
            </p>
          </div>
          {/* <PostMenuActions post={data}/> */}
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            {/* <Link className="underline">All</Link>
          <Link className="underline" to="/">
            Web Design
          </Link>
          <Link className="underline" to="/">
            Development
          </Link>
          <Link className="underline" to="/">
            Databases
          </Link>
          <Link className="underline" to="/">
            Search Engines
          </Link>
          <Link className="underline" to="/">
            Marketing
          </Link> */}
          </div>
        </div>
      </div>
      <NewsCommentsSection postId={blog.id} />
    </div>
  );
};

export default Page;
