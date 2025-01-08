import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Spin } from 'antd'; // Nhập Spin từ Ant Design

interface ChatMessageProps {
  message: string;
  sender: string;
  isLoading: boolean;
  setRef: React.RefObject<HTMLDivElement>;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  isLoading,
  setRef,
}) => {
  console.log('isloading', isLoading);
  return (
    <div
      className={`
        max-w-[85%] rounded-2xl p-4 
        ${
          sender === 'user'
            ? 'ml-auto bg-primary-500 text-white rounded-br-none'
            : 'mr-auto bg-white shadow-md rounded-bl-none'
        }
      `}
    >
      {sender === 'system' ? (
        isLoading ? (
          // Nếu đang chờ, hiển thị vòng quay loading
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : (
          // Khi có câu trả lời, hiển thị nội dung tin nhắn
          <ReactMarkdown className="prose prose-sm max-w-none dark:prose-invert">
            {message}
          </ReactMarkdown>
        )
      ) : (
        <p>{message}</p>
      )}
      {/* Thêm phần tử để cuộn tới tin nhắn mới */}
      <div ref={setRef} />
    </div>
  );
};

export default ChatMessage;
