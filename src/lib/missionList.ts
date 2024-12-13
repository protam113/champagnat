
"use client";
import { useMissionList } from "@/hooks/misssion/useMission";

export const MissionList = (currentPage: number, model: string, refreshKey: number) => {
    const { data, isLoading, isError } = useMissionList(currentPage,
        { category: [model], } // Use the model chosen by the user
        , refreshKey);


    const queueData = data?.results || [];

    return { queueData, isLoading, isError, next: data?.next, };
};
