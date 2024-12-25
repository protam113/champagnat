'use client';

import React, { useState, useEffect } from 'react';
import { useChat, useChatList } from '@/hooks/chatAI/useChat';
// import ReactMarkdown from 'react-markdown';
// import Container from '@/components/Container/container';
// import ChatSidebar from '@/components/main/study/chatAI/chatSideBar';
import ChatFont from '@/components/main/study/chatAI/chatFont';
import ChatInput from '@/components/main/study/chatAI/ChatInput';
import ChatMessage from '@/components/main/study/chatAI/ChatMessage';
// import DonationSection from '@/components/main/study/chatAI/chatSideBar';

const Page = () => {
  const [refreshKey] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, isLoading, isError } = useChatList(refreshKey);
  const { mutate } = useChat();
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { message: string; sender: string }[]
  >([]);

  useEffect(() => {
    if (data && Array.isArray(data) && !isLoading && !isError) {
      const formattedData = data
        .map((item: { content: string; response: string }) => [
          { message: item.content, sender: 'user' },
          { message: item.response, sender: 'system' },
        ])
        .flat();
      setChatHistory(formattedData);
    }
  }, [data, isLoading, isError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      setChatHistory((prev) => [
        ...prev,
        { message: userInput, sender: 'user' },
      ]);
      setUserInput('');
      mutate({ content: userInput });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header for mobile */}
      <div className="md:hidden bg-white border-b px-4 py-2 flex items-center">
        <h1 className="ml-4 text-xl font-bold text-primary-500">MaristChat</h1>
      </div>
      {/* Header for desktop */}
      <div className="hidden md:flex bg-white border-b px-8 py-4">
        <h1 className="text-4xl font-bold text-primary-500">MaristChat</h1>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0  bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500" />
              </div>
            ) : isError ? (
              <div className="text-center text-red-500 mt-4">
                Có lỗi xảy ra khi tải dữ liệu.
              </div>
            ) : chatHistory.length > 0 ? (
              <div className="max-w-3xl mx-auto space-y-4">
                {chatHistory.map((chat, index) => (
                  <ChatMessage
                    key={index}
                    message={chat.message}
                    sender={chat.sender}
                  />
                ))}
              </div>
            ) : (
              <ChatFont />
            )}
          </div>

          <ChatInput
            userInput={userInput}
            handleInputChange={handleInputChange}
            handleSendMessage={handleSendMessage}
          />

          {/* <DonationSection /> */}
        </main>
      </div>
    </div>
  );
};

export default Page;
