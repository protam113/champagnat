import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Spin } from 'antd';

interface ChatMessageProps {
  message: string;
  sender: string;
  isLoading: boolean;
  setRef: React.RefObject<HTMLDivElement>;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  sender,
  setRef,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (sender === 'system') {
      setIsLoading(true); // Khi hệ thống gửi yêu cầu, đặt isLoading = true
      // Giả lập một tác vụ bất đồng bộ như API call
      setTimeout(() => {
        setIsLoading(false); // Sau khi tác vụ hoàn tất, set isLoading = false
      }, 2000); // Giả lập thời gian tải 2 giây
    }
  }, [sender]);

  return (
    <div
      className={`max-w-[85%] rounded-2xl p-4 
        ${sender === 'user' ? 'ml-auto bg-primary-500 text-white rounded-br-none' : 'mr-auto bg-white shadow-md rounded-bl-none'}
      `}
    >
      {sender === 'system' ? (
        isLoading ? (
          <div className="flex justify-center">
            <Spin />
          </div>
        ) : (
          <ReactMarkdown className="prose prose-sm max-w-none dark:prose-invert">
            {message}
          </ReactMarkdown>
        )
      ) : (
        <p>{message}</p>
      )}
      <div ref={setRef} />
    </div>
  );
};

export default ChatMessage;
