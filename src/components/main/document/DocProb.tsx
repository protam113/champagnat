import Image from 'next/image';
import Link from 'next/link';
interface DocCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image: string | null;
}

const DocProb: React.FC<DocCardProps> = ({
  id,
  title,
  description,
  date,
  author,
  category,
  image,
}) => {
  return (
    <Link
      href={`/document/${id}`}
      className="rounded-lg shadow-lg overflow-hidden bg-white transform transition-transform duration-300 hover:scale-105 hover:text-amber-500" // Thêm hiệu ứng hover
    >
      <div className="relative h-48 w-full">
        <Image
          src={image || '/img/logo_default.png'}
          alt={title}
          fill // Tương ứng với layout="fill"
          className="object-cover rounded-lg" // Tailwind CSS cho hình ảnh
        />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-12 bg-primary-800 text-white rounded-full px-2 py-1">
            {category}
          </span>
        </div>
        <div className="text-gray-500 text-sm">
          {author} • {date}
        </div>
        <h3 className="text-lg font-semibold my-2">{title}</h3>
        <p className="text-gray-700 text-sm line-clamp-4">{description}</p>
      </div>
    </Link>
  );
};

export default DocProb;
