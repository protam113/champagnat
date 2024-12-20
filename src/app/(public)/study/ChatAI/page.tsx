'use client';

// Page.tsx
import React, { useState, useEffect } from 'react';
import { useChat, useChatList } from '@/hooks/chatAI/useChat';

import ReactMarkdown from 'react-markdown';
import Container from '@/components/Container/container';
import ChatSidebar from '@/components/main/study/chatAI/chatSideBar';
import ChatFont from '@/components/main/study/chatAI/chatFont';
import ChatInput from '@/components/main/study/chatAI/ChatInput';
const Page = () => {
  // const [chatView, setChatView] = useState(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
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
      // setChatView(true);
    }
  };

  return (
    <Container>
      <div className="pt-10 flex">
        <ChatSidebar setRefreshKey={setRefreshKey} />

        <div className="flex-1 flex flex-col bg-white px-4">
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-50px)] transition-all duration-300">
              {isLoading ? (
                <p className="text-gray-500">Đang tải dữ liệu...</p>
              ) : isError ? (
                <p className="text-red-500">Có lỗi xảy ra khi tải dữ liệu.</p>
              ) : chatHistory.length > 0 ? (
                chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`${
                      chat.sender === 'user'
                        ? ' text-white bg-primary-500 p-2 rounded-lg w-max text-right ml-auto'
                        : ' text-black bg-gray-200 p-2 rounded-lg w-full mr-auto'
                    }`}
                  >
                    {chat.sender === 'system' ? (
                      <ReactMarkdown>{chat.message}</ReactMarkdown> // Hiển thị markdown cho hệ thống
                    ) : (
                      chat.message
                    )}
                  </div>
                ))
              ) : (
                <ChatFont />
              )}
            </div>
          </div>

          <ChatInput
            userInput={userInput}
            handleInputChange={handleInputChange}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </Container>
  );
};

export default Page;
