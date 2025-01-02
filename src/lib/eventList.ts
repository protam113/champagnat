// eventList.ts

import { useEventList } from "@/hooks/event/useEvent";

export const EventList = (currentPage: number, events: string[], status: string[], refreshKey: number) => {
  const { data, isLoading, isError } = useEventList(currentPage, { category: events, status }, refreshKey);

  const queueData = data?.results || [];

  return { 
    queueData, 
    next: data?.next,
    count: data?.count,
    isLoading, 
    isError 
  };
};
