'use client';
// components/PushButton.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { PushButtonProps } from '@/types/types';

const PushButton: React.FC<PushButtonProps> = ({ href, label }) => {
  const router = useRouter();

  const handlePush = () => {
    router.push(href); // Chuyển hướng đến trang chỉ định
  };

  return (
    <header className="bg-primary-500 py-3 rounded-lg flex items-center justify-between">
      <h2 className="text-white font-semibold pl-4">{label}</h2>
      <button
        className="text-white font-semibold pr-4 hover:opacity-80 transition-opacity duration-200"
        onClick={handlePush}
      >
        Xem thêm
      </button>
    </header>
  );
};

export default PushButton;
