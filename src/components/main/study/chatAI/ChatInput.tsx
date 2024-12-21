'use client';

import React from 'react';

interface ChatInputProps {
  userInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  userInput,
  handleInputChange,
  handleSendMessage,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="border-t bg-white p-2 md:p-4">
      <div className="max-w-3xl mx-auto flex items-center gap-2">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Nhập câu hỏi của bạn..."
          className="flex-1 px-4 py-2 md:py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 md:px-6 md:py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full transition-all duration-300 flex items-center justify-center"
        >
          <span className="hidden md:inline">Gửi</span>
          <svg
            className="w-6 h-6 md:ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
