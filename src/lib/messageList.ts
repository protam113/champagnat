"use client";

import { useMessageList } from "@/hooks/message/useMessage";

export const MessageList = (currentPage: number, refreshKey: number) => {


    const { data, isLoading, isError } = useMessageList(currentPage,
        // Use the category chosen by the news
        refreshKey);


    const queueData = data?.results || [];

    return { queueData, next: data?.next, isLoading, isError };
};
