interface ChatSidebarProps {
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChatSidebar({ setRefreshKey }: ChatSidebarProps) {
  const handleChatClick = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment the key to trigger refresh
  };

  return (
    <aside className="w-64 bg-white shadow-xl flex flex-col transition-all duration-300 relative cursor-pointer">
      <div className="p-6 border-b">
        <h1 className="text-3xl font-bold text-primary-500">MaristChat</h1>
      </div>
      <ul className="space-y-4 p-4">
        <li
          onClick={handleChatClick} // Attach onClick handler
          className="flex items-center space-x-4 hover:text-yellow-500 hover:bg-gray-100 p-2 rounded-md transition-all duration-200 cursor-pointer"
        >
          <span className="text-lg">Chat</span>
        </li>
        <li className="flex items-center space-x-4 hover:text-yellow-500 hover:bg-gray-100 p-2 rounded-md transition-all duration-200">
          <span className="text-lg">Documentation</span>
        </li>
        <li className="flex items-center space-x-4 hover:text-yellow-500 hover:bg-gray-100 p-2 rounded-md transition-all duration-200">
          <span className="text-lg">Facebook</span>
        </li>
        <li className="flex items-center space-x-4 hover:text-yellow-500 hover:bg-gray-100 p-2 rounded-md transition-all duration-200">
          <span className="text-lg">Make a donation</span>
        </li>
        <li className="flex items-center space-x-4 hover:text-yellow-500 hover:bg-gray-100 p-2 rounded-md transition-all duration-200">
          <span className="text-lg">Language</span>
        </li>
      </ul>
    </aside>
  );
}
