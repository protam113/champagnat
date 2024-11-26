"use client";

import {
    useQuery,
} from "@tanstack/react-query";
import { handleAPI } from "@/apis/axiosClient";
import { endpoints } from "@/apis/api";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";

interface Category {
    id: string;
    name: string;
    file: string;
}

interface User {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    profile_image: string;
}

interface BLogs {
    id: string;
    title: string;
    description: string;
    content: string; // Có thể cần điều chỉnh nếu cấu trúc khác
    link: string;
    image: string | null; // Chỉnh sửa để phù hợp với giá trị null trong JSON
    categories: Category[];
    user: User; // Sử dụng interface User đã khai báo ở trên
}

// Khai Báo Các Thuộc Tính Không Có trong trường hiển thị
interface FetchBLogsListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: BLogs[];
}

// Bộ Lọc
interface Filters {
    [key: string]: string | number | string[] | undefined;
}

const fetchBloglist = async (
    filters: Filters,
    pageParam: number = 1,
    token?: string
): Promise<FetchBLogsListResponse> => {
    try {
        // Filter out undefined or empty values from filters
        const validFilters = Object.fromEntries(
            Object.entries(filters).filter(
                ([, value]) => value !== undefined && value !== ""
            )
        );
        // Construct the query string
        const queryString = new URLSearchParams({
            page: pageParam.toString(),
            ...validFilters, // Merge the valid filters into the query string
        }).toString();

        // Make the API request using handleAPI
        const response = await handleAPI(
            `${endpoints.blogs}${queryString ? `?${queryString}` : ""}`,
            "GET",
            null,
            token || null
        );
        return response;
    } catch (error) {
        console.error("Error fetching blogs list:", error);
        throw error; // Rethrow error for further handling
    }
};


// Custom hook for fetching the queue list
const useBlogList = (page: number, filters: Filters = {}, refreshKey: number) => {
    const { getToken } = useAuth();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const userToken = await getToken();
            setToken(userToken); // Lưu token nếu có
        };

        fetchToken();
    }, [getToken]);

    return useQuery<FetchBLogsListResponse, Error>({
        queryKey: ["blogList", filters, page, token, refreshKey], // Thêm refreshKey vào queryKey
        queryFn: async () => fetchBloglist(filters, page, token || undefined),
        staleTime: 60000,
    });
};

export { useBlogList };