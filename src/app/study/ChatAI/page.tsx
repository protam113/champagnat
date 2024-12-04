"use client";
import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaBook,
  FaInfoCircle,
  FaFacebook,
  FaDonate,
  FaGlobe,
} from "react-icons/fa";

const ChatAi = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chatView, setChatView] = useState(false); // Biến trạng thái xác định hiển thị nội dung chính hay phần chat
  const [userInput, setUserInput] = useState(""); // Lưu nội dung nhập
  const [chatHistory, setChatHistory] = useState([]); // Lưu lịch sử chat

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      // Cập nhật lịch sử chat và hiển thị phần chat
      setChatHistory((prev) => [
        ...prev,
        { message: userInput, sender: "user" },
      ]);
      setUserInput(""); // Reset input
      setChatView(true); // Chuyển sang chế độ chat
    }
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } shadow-md bg-white flex flex-col transition-all duration-300 relative cursor-pointer`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 -right-4 bg-gray-700 hover:bg-gray-600 p-2 rounded-full text-white shadow-lg"
        >
          {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        <div className="p-4">
          {isSidebarOpen && (
            <h1 className="text-2xl font-bold mb-6 text-primary-500">
              MaristChat
            </h1>
          )}
        </div>

        <ul className="space-y-4 p-4">
          <li className="flex items-center space-x-4 hover:text-yellow-300">
            <FaBook />
            {isSidebarOpen && <span>Chat</span>}
          </li>
          <li className="flex items-center space-x-4 hover:text-yellow-300">
            <FaInfoCircle />
            {isSidebarOpen && <span>Documentation</span>}
          </li>
          <li className="flex items-center space-x-4 hover:text-yellow-300">
            <FaFacebook />
            {isSidebarOpen && <span>Facebook</span>}
          </li>
          <li className="flex items-center space-x-4 hover:text-yellow-300">
            <FaDonate />
            {isSidebarOpen && <span>Make a donation</span>}
          </li>
          <li className="flex items-center space-x-4 hover:text-yellow-300">
            <FaGlobe />
            {isSidebarOpen && <span>Language</span>}
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-white px-4 h-full">
        {!chatView ? (
          // Nội dung chính
          <div className="flex flex-col items-center justify-center text-center flex-1">
            <h1 className="text-4xl font-bold text-primary-500 mb-4">
              MaristChat
            </h1>
            <p className="text-gray-600 text-lg">
              Giáo lý nhà Thờ trong tầm tay bạn
            </p>
            <p className="pb-5">
              Hãy đặt tất cả các câu hỏi của bạn vào ChatGPT này để phục vụ Giáo
              hội.
              <br />
              Nhờ trí tuệ nhân tạo, bạn sẽ nhận được câu trả lời phù hợp với
              giáo lý Công giáo.
            </p>
            <div className="flex space-x-4 mb-6">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full">
                Bằng chứng về sự tồn tại của chúa?
              </button>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full">
                Bảy bí tích là gì?
              </button>
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full">
                Tại sao Isaac lại là nhân vật cứu thế?
              </button>
            </div>
          </div>
        ) : (
          // Phần chat
          <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="flex-1 p-4 space-y-4">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`${
                    chat.sender === "user"
                      ? "text-right text-blue-500"
                      : "text-left text-gray-700"
                  }`}
                >
                  {chat.message}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="flex items-center p-4 border-t bg-gray-50">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-primary-500 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg"
          >
            Gửi
          </button>
        </div>
      </main>
    </div>
  );
};

export default ChatAi;
