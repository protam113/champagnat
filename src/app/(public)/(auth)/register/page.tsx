"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/image/logo.png";
import { useRegister } from "@/hooks/account/useAccount";
import { message } from "antd";

const RegisterPage = () => {
    const { mutate: registerUser } = useRegister();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page refresh
        setLoading(true);

        // Convert phone_number to a number before sending
        const newUser = {
            ...formData,
            phone_number: parseInt(formData.phone_number, 10)
        };

        try {
            await registerUser(newUser);
            message.success("Thêm người dùng thành công!");
            setFormData({
                username: "",
                password: "",
                email: "",
                first_name: "",
                last_name: "",
                phone_number: "",
            });
        } catch (error: any) {
            console.error(error);
            message.error("Có lỗi xảy ra khi thêm người dùng.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-full flex items-center justify-center pt-10">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-center mb-6">
                    <Image src={Logo} alt="logo" height={80} width={130} />
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Đăng ký tài khoản
                </h2>
                <form onSubmit={handleRegister}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label
                                htmlFor="first_name"
                                className="block text-sm text-gray-600 mb-1"
                            >
                                Tên:
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="Nhập tên của bạn"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="last_name"
                                className="block text-sm text-gray-600 mb-1"
                            >
                                Họ:
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="Nhập họ của bạn"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm text-gray-600 mb-1"
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="Nhập email của bạn"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm text-gray-600 mb-1"
                            >
                                Tên đăng nhập:
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="Nhập tên đăng nhập"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="phone_number"
                                className="block text-sm text-gray-600 mb-1"
                            >
                                Số điện thoại:
                            </label>
                            <input
                                type="tel"
                                id="phone_number"
                                name="phone_number"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="Nhập số điện thoại"
                                value={formData.phone_number}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm text-gray-600 mb-1"
                            >
                                Mật khẩu:
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                                placeholder="Nhập mật khẩu"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition duration-200"
                        disabled={loading}
                    >
                        {loading ? "Đang xử lý..." : "Đăng ký"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Đã có tài khoản?{" "}
                        <Link href="/login" className="text-indigo-500 hover:underline">
                            Đăng nhập ngay
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
