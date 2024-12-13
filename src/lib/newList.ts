"use client";

import { useNewsList } from "@/hooks/news/useNews";

// NewsList.ts

export const NewsList = (currentPage: number, category: string, refreshKey: number) => {

    const filters = category.trim() === "" ? {} : { category };

    const { data, isLoading, isError } = useNewsList(currentPage,
        filters // Use the category chosen by the news
        , refreshKey);


    const queueData = data?.results || [];

    return {
        queueData, isLoading, isError, next: data?.next,
        count: data?.count,
    };
};
