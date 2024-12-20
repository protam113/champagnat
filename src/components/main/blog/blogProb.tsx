import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  categories: string[];
  image: string;
}

const BlogProb: React.FC<BlogCardProps> = ({
  id,
  title,
  description,
  date,
  author,
  categories,
  image,
}) => {
  return (
    <Link
      href={`/blog/${id}`}
      className="rounded-lg shadow-lg overflow-hidden bg-white transform transition-transform duration-300 hover:scale-105 hover:text-amber-500"
    >
      {/* Hình ảnh bài viết */}
      <div className="relative h-48 w-full">
        <Image
          src={image || '/placeholder-image.jpg'}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover rounded-t-lg"
        />
      </div>

      {/* Nội dung bài viết */}
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <span
              key={category}
              className="text-xs bg-primary-800 font-bold text-white rounded-full px-2 py-1"
            >
              {category}
            </span>
          ))}
        </div>
        <p className="text-gray-500 text-sm">
          {author} • {date}
        </p>
        <h3 className="text-lg font-semibold my-2">{title}</h3>
        <p className="text-gray-700 text-sm line-clamp-4">{description}</p>
      </div>
    </Link>
  );
};

export default React.memo(BlogProb);
