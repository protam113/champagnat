"use client";

import { useBlogsList } from "@/hooks/blog/useBlog";

// BlogList.ts

export const BlogList = (currentPage: number, category: string ,refreshKey: number) => {

    const filters = category.trim() === "" ? {} : { category };

    const { data, isLoading, isError } = useBlogsList(currentPage,
        filters // Use the category chosen by the news
        ,refreshKey);

       
    
    const queueData = data?.results || [];

    const latestPost = queueData[0];
    const otherPosts = queueData.slice(1, 4);

    return { 
        queueData,
        next:data?.next,
        count: data?.count,
        latestPost,
        otherPosts,
        isLoading, 
        isError };
};
