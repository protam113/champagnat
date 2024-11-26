import axios, { AxiosRequestConfig } from "axios";
import { baseURL } from "./api";

// Function to create an Axios instance with optional token
const authApi = (token: string | null = null) => {
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
    return axios.create({
        baseURL,
        headers, // Chỉ thêm header Authorization nếu token tồn tại
    });
};


// Function to handle API requests with support for different HTTP methods
const handleAPI = async (
    url: string,
    method: 'POST' | 'PATCH' | 'GET' | 'DELETE' = 'GET',
    data?: any,
    token: string | null = null
) => {
    try {
        const apiInstance = authApi(token);
        const config: AxiosRequestConfig = {
            url,
            method,
            data,
        };
        const response = await apiInstance(config);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error("Error Response:", error.response);
            throw new Error(`API request failed: ${error.response?.data?.message || error.message}`);
        } else {
            throw new Error("API request failed: " + error.message);
        }
    }
};


export default handleAPI;
export { handleAPI };
