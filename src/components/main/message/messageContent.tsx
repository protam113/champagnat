'use client';

import { useState, useMemo } from 'react';
import formatDate from '@/utils/formatDate';
import Container from '../../Container/container';
import { ClipLoader } from 'react-spinners';
import Tittle from '@/components/design/Tittle';
import { motion } from 'framer-motion';
// import MessageTag from './messageCategoryTag';
import MessageProb from './messageProb';
import { MessageList } from '@/lib/messageList';
import { NotiPostNull, NotiPostError } from '@/components/design/index';
import Pagination from '@/components/Pagination/Pagination';

const MessageContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey] = useState(0);

  // Lấy danh sách tin tức từ API
  const {
    queueData: message,
    next,
    isLoading,
    isError,
    count = 0,
  } = MessageList(currentPage, refreshKey);
  const dataSource = useMemo(() => message, [message]);
  // Kiểm tra dữ liệu
  if (isLoading)
    return (
      <div>
        <div className="text-center">
          <ClipLoader size="20" loading={isLoading} />
        </div>
      </div>
    );
  if (isError) return <NotiPostError />;
  if (!isLoading && count === 0) return <NotiPostNull />;

  const totalPages = next ? currentPage + 1 : currentPage;

  return (
    <main>
      <Container>
        <Tittle name="TẤT CẢ THƯ " />
        {/* Add motion for smooth transition of the content grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {dataSource.map((message, index) => (
            <MessageProb
              key={index}
              id={message.id}
              title={message.title}
              description={message.description}
              date={formatDate(message.created_date)}
              author={message.user.username}
              image={message?.image}
            />
          ))}
        </motion.div>
        {count > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </Container>
    </main>
  );
};

export default MessageContent;
