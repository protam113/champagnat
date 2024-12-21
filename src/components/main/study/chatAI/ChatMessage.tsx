import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: string;
  sender: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, sender }) => {
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
        <ReactMarkdown className="prose prose-sm max-w-none dark:prose-invert">
          {message}
        </ReactMarkdown>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default ChatMessage;
