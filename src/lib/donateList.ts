"use client";

import { useDonateList } from "@/hooks/donate/useDonate";

// NewsList.ts

export const DonateList = (currentPage: number, category: string, refreshKey: number) => {

    const filters = category.trim() === "" ? {} : { category };

    const { data, isLoading, isError } = useDonateList(currentPage,
        filters // Use the category chosen by the news
        , refreshKey);


    const queueData = data?.results || [];

    return {
        queueData, isLoading, isError, next: data?.next,
        count: data?.count,
    };
};