import Image from 'next/image';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';

interface SuvuCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  categories: string;
  image: string | null; // Cho phép giá trị null
}

const MissionProb: React.FC<SuvuCardProps> = ({
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
      href={`/hoi_dong/su_vu/${id}`}
      className="rounded-lg shadow-lg overflow-hidden bg-white transform transition-transform duration-300 hover:scale-105  hover:text-yellow-500" // Thêm hiệu ứng hover
    >
      <LazyLoad
        height={192}
        offset={100}
        placeholder={
          <div className="h-48 w-full bg-gray-200 animate-pulse"></div>
        }
      >
        <div className="relative h-48 w-full">
          <Image
            src={image || '/img/logo_default.png'}
            alt={title}
            fill
            priority={false} // Bỏ 'priority' để LazyLoad hoạt động đúng
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover rounded-t-lg"
          />
        </div>
      </LazyLoad>

      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.isArray(categories) ? (
            categories.map((category, index) => (
              <span key={index} className="inline-block">
                {category.name}
              </span>
            ))
          ) : (
            <span className="text-12 bg-primary-800 font-bold text-white rounded-full px-2 py-1">
              {categories}
            </span>
          )}
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

export default MissionProb;
