import { FaExclamationTriangle } from 'react-icons/fa';

const NoPosts = () => {
  return (
    <div className="flex justify-center items-center flex-col space-y-4 p-6 bg-gray-100 rounded-lg shadow-md">
      <FaExclamationTriangle className="text-4xl text-gray-400" />
      <p className="text-lg text-gray-600">NKh</p>
    </div>
  );
};

export default NoPosts;
