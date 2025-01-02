'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useChat, useChatList } from '@/hooks/chatAI/useChat';
import ChatFont from '@/components/main/study/chatAI/chatFont';
import ChatInput from '@/components/main/study/chatAI/ChatInput';
import ChatMessage from '@/components/main/study/chatAI/ChatMessage';
import { Modal, Button, Spin } from 'antd';
import QR from '@/assets/image/QR_Code.png';
import { BankOutlined } from '@ant-design/icons';

const Page = () => {
  const [refreshKey] = useState<number>(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, isLoading, isError } = useChatList(refreshKey);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useChat();
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<
    { message: string; sender: string }[]
  >([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header for mobile */}
        <div className="md:hidden bg-white border-b px-4 py-2 flex items-center justify-between">
          <h1 className="ml-4 text-xl font-bold text-primary-500">
            MaristChat
          </h1>
          <Button type="primary" onClick={showModal}>
            Donation
          </Button>
        </div>

        {/* Header for desktop */}
        <div className="hidden md:flex bg-white border-b px-8 py-4 items-center justify-between">
          <h1 className="text-4xl font-bold text-primary-500">MaristChat</h1>
          <Button type="primary" onClick={showModal}>
            Donation
          </Button>
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
                  {/* Hiệu ứng loading từ Ant Design */}
                  <Spin size="large" />
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
                      isLoading={isLoading && chat.sender === 'system'}
                      setRef={messagesEndRef} // Truyền ref vào ChatMessage
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
          </main>
        </div>
      </div>
      {/* Modal */}
      <Modal
        title="Thông Tin Ủng Hộ"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800} // Thêm chiều rộng cho modal để không gian rộng hơn
        style={{ padding: '24px' }} // Thay bodyStyle bằng style
      >
        <div className="flex flex-col md:flex-row items-center">
          {/* Nội dung bên trái */}
          <div className="md:w-2/3 text-base">
            <p>
              Xin chào, mình là <strong>Thưởng</strong>!
            </p>
            <p>
              Mình rất mong nhận được sự ủng hộ từ các bạn để có thể tối ưu và
              mở rộng hệ thống chat <strong>MaristChat</strong>, mang đến nhiều
              thông tin bổ ích hơn cho mọi người.
            </p>
            <p>
              <BankOutlined style={{ marginRight: '8px', color: '#1890ff' }} />{' '}
              Thông tin ủng hộ: <br />- Ngân hàng: <strong>MB Bank</strong>{' '}
              (Ngân hàng Thương mại cổ phần Quân đội)
              <br />- Số tài khoản: <strong>2460909199324609091993</strong>
              <br />- Nội dung chuyển khoản:{' '}
              <strong>&quot;Ủng hộ Thưởng - MaristChat&quot;</strong>
            </p>
          </div>

          {/* Hình ảnh QR bên phải */}
          <div className="md:w-1/3 flex justify-center mt-4 md:mt-0">
            <div className="flex flex-col items-center">
              <Image
                src={QR} // Thay đường dẫn bằng hình QR của bạn
                alt="QR Code"
                width={250} // Tăng kích thước ảnh QR
                height={250} // Tăng kích thước ảnh QR
                className="object-contain border rounded-md shadow"
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Page;
