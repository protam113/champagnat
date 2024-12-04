"use client";
import { useCategoryList } from "@/hooks/category/useCategory";

 // Đảm bảo đây là client component

// categoriesList.ts

export const CategoriesList = (currentPage: number, model: string, refreshKey: number) => {
    const { data, isLoading, isError } = useCategoryList(currentPage, {
        model: [model], // Use the model chosen by the user
    },refreshKey);


    const queueData = data?.results || [];

    return { queueData, isLoading, isError };
};
