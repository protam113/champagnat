"use client";

import { useBlogsList } from "@/hooks/blog/useBlog";

// BlogList.ts

export const BlogList = (currentPage: number, category: string ,refreshKey: number) => {

    const filters = category.trim() === "" ? {} : { category };

    const { data, isLoading, isError } = useBlogsList(currentPage,
        filters // Use the category chosen by the news
        ,refreshKey);

       
    
    const queueData = data?.results || [];

    return { 
        queueData,
        next:data?.next,
        count: data?.count,
        isLoading, 
        isError };
};
