"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleAPI } from "@/apis/axiosClient";
import { endpoints } from "@/apis/api";
import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import { message } from "antd";
import { ChangePassword } from "@/types/types";

const ChangePasswordAuth = async (
  changePassword: ChangePassword,
  token: string
) => {
  const formData = new FormData();

  // Duyệt qua các thuộc tính của `newBlog` và xử lý
  for (const key in changePassword) {
    const value = changePassword[key as keyof ChangePassword];

    if (value) {
      // Thêm các trường khác
      formData.append(key, value as string);
    }
  }

  if (!token) throw new Error("No token available");

  try {
    // Gửi FormData tới backend
    const response = await handleAPI(
      `${endpoints.changePassword}`,
      "PATCH",
      formData,
      token
    );
    return response.data;
  } catch (error: any) {
    console.error("Error creating blog:", error.response?.data);
    throw new Error(error.response?.data?.message || "Failed to create blog");
  }
};

const useChangePassword = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await getToken();
      setToken(userToken);
    };

    fetchToken();
  }, [getToken]);

  return useMutation({
    mutationFn: async (changePassword: ChangePassword) => {
      if (!token) {
        throw new Error("Token is not available");
      }
      return ChangePasswordAuth(changePassword, token);
    },
    onSuccess: () => {
      message.success("Mật Khẩu Đã Được Thay Đổi Thành Công");
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
    onError: (error) => {
      console.log(error.message || "Failed to create blog.");
    },
  });
};

export { useChangePassword };
