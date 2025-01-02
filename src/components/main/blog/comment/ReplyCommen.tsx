'use client';

import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { useUser } from '@/context/userContext';
import { Input } from 'antd';
import { useCreateComment } from '@/hooks/comment/useComment';

const { TextArea } = Input;

const ReplyComment = ({
  postId,
  model,
  parent,
}: {
  postId: string;
  model: string;
  parent: string;
}) => {
  const { mutate } = useCreateComment();
  const { userInfo } = useUser() || {};
  const [commentText, setCommentText] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  const handleGuestNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGuestName(event.target.value);
  };

  const handleGuestEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGuestEmail(event.target.value);
  };

  const handleSubmit = async () => {
    if (!userInfo && (!guestName || !guestEmail)) {
      return alert('Vui lòng nhập tên và email trước khi gửi bình luận.');
    }

    mutate({
      content: commentText,
      object_id: postId,
      model: model,
      guest_name: userInfo ? null : guestName,
      guest_email: userInfo ? null : guestEmail,
      parent: parent,
    });

    setCommentText('');
    if (!userInfo) {
      setGuestName('');
      setGuestEmail('');
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents adding a new line
      handleSubmit(); // Submit the comment
    }
  };

  return (
    <div className="flex flex-col p-3 bg-white-blue1 rounded-lg space-y-4">
      {!userInfo && (
        <div className="flex flex-col space-y-2">
          <Input
            value={guestName}
            onChange={handleGuestNameChange}
            placeholder="Tên của bạn"
            className="rounded-md border text-black border-zinc-500 bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <Input
            type="email"
            value={guestEmail}
            onChange={handleGuestEmailChange}
            placeholder="Email của bạn"
            className="rounded-md border text-black border-zinc-500 bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
      )}

      <div className="flex items-center space-x-4">
        <TextArea
          value={commentText}
          autoSize={{ minRows: 2, maxRows: 6 }}
          onChange={handleCommentChange}
          onKeyDown={handleKeyDown}
          placeholder="Viết bình luận..."
          className="flex-grow rounded-md border-b text-black border-zinc-500 bg-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          onClick={handleSubmit}
          className="w-10 h-10 flex items-center justify-center text-black"
        >
          <FaPaperPlane className="text-black hover:text-blue-500 transition-all" />
        </button>
      </div>
    </div>
  );
};

export default ReplyComment;
