interface ChatSidebarProps {
  setRefreshKey: React.Dispatch<React.SetStateAction<number>>;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatSidebar({
  setRefreshKey,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  const menuItems = [
    {
      label: 'Chat',
      onClick: () => {
        setRefreshKey((prevKey) => prevKey + 1);
        onClose();
      },
    },
    { label: 'Documentation', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'Make a donation', href: '#' },
    { label: 'Language', href: '#' },
  ];

  return (
    <>
      <aside
        className={`
          fixed md:relative top-0 left-0 h-full
          w-72 bg-white shadow-xl flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-6 border-b flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-500">MaristChat</h1>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4 space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={item.onClick}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-3"
                >
                  <span className="text-gray-700">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
