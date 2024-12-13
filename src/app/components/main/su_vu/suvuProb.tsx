import { FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface SuvuCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  categories: string;
  image: string;
}

const SuvuProb: React.FC<SuvuCardProps> = ({
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
          {Array.isArray(categories) ? (
            categories.map((category, index) => (
              <span key={index} className="inline-block">
                {category.name}
              </span>
            ))
          ) : (
            <span>{categories}</span>
          )}
        </div>
        <a href="#" className="flex items-center text-blue-500 text-sm mt-4">
          Read More <FaExternalLinkAlt className="ml-1" />
        </a>
      </div>
    </Link>
  );
};

export default SuvuProb;
