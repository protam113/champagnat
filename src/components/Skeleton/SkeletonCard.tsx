const SkeletonCard = () => (
  <div className="rounded-lg shadow-lg overflow-hidden bg-gray-200 animate-pulse">
    <div className="relative h-48 w-full bg-gray-300"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
    </div>
  </div>
);

export default SkeletonCard;
