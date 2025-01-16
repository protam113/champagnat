
"use client";
import { useMissionList } from "@/hooks/misssion/useMission";


export const MissionList = (currentPage: number, category: string, refreshKey: number) => {
    // Chỉ tạo filters khi category có giá trị hợp lệ
    const filters = category.trim() !== "" ? { category } : {};

    const { data, isLoading, isError } = useMissionList(currentPage, filters, refreshKey);

    const queueData = data?.results || [];

    return { 
        queueData, 
        isLoading, 
        isError, 
        next: data?.next,        
        count: data?.count,
    };
};
