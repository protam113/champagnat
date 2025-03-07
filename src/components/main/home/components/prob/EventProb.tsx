import Image from 'next/image';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  image: string | null;
}

const EventProb: React.FC<EventCardProps> = ({ id, title, date, image }) => {
  return (
    <Link
      href={`/events/${id}`}
      className="rounded-lg shadow-lg overflow-hidden bg-white transform transition-transform duration-300 hover:scale-105 hover:text-yellow-500" // Thêm hiệu ứng hover
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
        <p className="text-gray-500 text-sm">{date}</p>
        <h3 className="text-lg font-semibold my-2">{title}</h3>
      </div>
    </Link>
  );
};

export default EventProb;
