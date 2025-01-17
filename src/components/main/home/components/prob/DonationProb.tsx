import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string | null;
}

const DonationProb: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  date,
  image,
}) => {
  return (
    <Link
      href={`/hoi_dong/su_vu/${id}`}
      className="rounded-lg shadow-lg overflow-hidden bg-white transform transition-transform duration-300 hover:scale-105" // Thêm hiệu ứng hover
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

      <div className="p-4">
        <p className="text-gray-500 text-sm">{date}</p>
        <h3 className="text-lg font-semibold my-2">{title}</h3>
        <p className="text-gray-700 text-sm line-clamp-4">{description}</p>
      </div>
    </Link>
  );
};

export default DonationProb;
