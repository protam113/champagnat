import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/image/logo_default_blog.png';

interface MessageCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  categories: string[];
  image: string | null;
}

const MessageProb: React.FC<MessageCardProps> = ({
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
      href={`/founder/letter_from_the_founder/${id}`}
      className="rounded-lg shadow-xl overflow-hidden bg-white transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:border-amber-500 hover:text-amber-500" // Thêm border và shadow // Thêm hiệu ứng hover
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
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <span
              key={category}
              className="text-12 bg-primary-800 text-white rounded-full px-2 py-1"
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

export default MessageProb;
