import { FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface DonateCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  categories: string[];
  image: string;
}

const DonateProb: React.FC<DonateCardProps> = ({
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
      href={`/donation/${id}`}
      className="rounded-lg shadow-lg overflow-hidden bg-white transform transition-transform duration-300 hover:scale-105" // Thêm hiệu ứng hover
    >
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill // Tương ứng với layout="fill"
          className="object-cover rounded-lg" // Tailwind CSS cho hình ảnh
        />
      </div>

      <div className="p-4">
        <p className="text-gray-500 text-sm">
          {author} • {date}
        </p>
        <h3 className="text-lg font-semibold my-2">{title}</h3>
        <p className="text-gray-700 text-sm line-clamp-4">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <span
              key={category}
              className="text-xs bg-gray-200 text-gray-600 rounded-full px-2 py-1"
            >
              {category}
            </span>
          ))}
        </div>
        <a href="#" className="flex items-center text-blue-500 text-sm mt-4">
          Read More <FaExternalLinkAlt className="ml-1" />
        </a>
      </div>
    </Link>
  );
};

export default DonateProb;
