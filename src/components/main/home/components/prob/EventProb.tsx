import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/image/logo_default.png';
interface EventCardProps {
  id: string;
  title: string;
  date: string;
  image: string | null;
}

const EventProb: React.FC<EventCardProps> = ({ id, title, date, image }) => {
  return (
    <Link
      href={`/hoi_dong/su_vu/${id}`}
      className="rounded-lg shadow-lg overflow-hidden bg-white transform transition-transform duration-300 hover:scale-105" // Thêm hiệu ứng hover
    >
      <div className="relative h-48 w-full">
        <Image
          src={image || logo}
          alt={title}
          fill // Tương ứng với layout="fill"
          className="object-cover rounded-t-lg" // Tailwind CSS cho hình ảnh
        />
      </div>

      <div className="p-4">
        <p className="text-gray-500 text-sm">{date}</p>
        <h3 className="text-lg font-semibold my-2">{title}</h3>
      </div>
    </Link>
  );
};

export default EventProb;
