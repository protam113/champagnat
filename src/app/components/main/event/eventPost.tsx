import { FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

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
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill // Tương ứng với layout="fill"
          className="object-cover rounded-t-lg" // Tailwind CSS cho hình ảnh
        />
      </div>

      <div className="p-4">
        <p className="text-gray-500 text-sm">{date}</p>
        <h3 className="text-lg font-semibold my-2">{title}</h3>

        <a href="#" className="flex items-center text-blue-500 text-sm mt-4">
          Read More <FaExternalLinkAlt className="ml-1" />
        </a>
      </div>
    </Link>
  );
};

export default EventProb;
