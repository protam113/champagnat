import Image from 'next/image';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';

interface BlogCardProps {
  id: string;
  title: string;
  date: string;
  image: string;
}

const EventProb: React.FC<BlogCardProps> = ({ id, title, date, image }) => {
  return (
    <Link
      href={`/events/${id}`}
      className="rounded-lg shadow-lg overflow-hidden bg-white transform transition-transform duration-300 hover:scale-105" // Thêm hiệu ứng hover
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
            className="object-cover rounded-t-lg" // Tailwind CSS cho hình ảnh
          />
        </div>
      </LazyLoad>

      <div className="p-4">
        <p className="text-gray-500 text-sm">{date}</p>
        <h3 className="text-lg font-semibold my-2">{title}</h3>
      </div>
    </Link>
  );
};

export default EventProb;
