"use client";

import { useCommentList } from "@/hooks/comment/useComment";

export const CommentList = ({
  currentPage,
  filter,
  refreshKey,
}: {
  currentPage: number;
  filter: { object_id: string[]; model: string[]; parent_id?: string | null };
  refreshKey: number;
}) => {
  const { data, isLoading, isError } = useCommentList(
    currentPage,
    {
      ...filter,
      parent_id: filter.parent_id ?? undefined, // Chuyển null thành undefined
    },
    refreshKey
  );

  const queueData = data?.results || [];

  return {
    queueData,
    next: data?.next,
    count: data?.count,
    isLoading,
    isError,
  };
};
