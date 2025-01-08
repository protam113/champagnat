"use client";

import { useMessageList } from "@/hooks/message/useMessage";

export const MessageList = (currentPage: number, category: string, refreshKey: number) => {

    const filters = category && category.trim() !== "" ? { category } : {};

    const { data, isLoading, isError } = useMessageList(currentPage,
        filters // Use the category chosen by the news
        , refreshKey);


    const queueData = data?.results || [];

    return { queueData, next: data?.next, isLoading, isError };
};
