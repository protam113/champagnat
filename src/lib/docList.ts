"use client";

import { useDocList } from "@/hooks/document/useDocument";


// DocList.ts

export const DocList = (currentPage: number, category: string, refreshKey: number) => {

    const filters = category && category.trim() !== "" ? { category } : {};

    const { data, isLoading, isError } = useDocList(currentPage,
        filters // Use the category chosen by the news
        , refreshKey);


    const queueData = data?.results || [];

    return { queueData, next: data?.next, isLoading, isError };
};
