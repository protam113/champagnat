export default function ChatFont() {
  const suggestions = [
    'Bằng chứng về sự tồn tại của chúa?',
    'Bảy bí tích là gì?',
    'Tại sao Isaac lại là nhân vật cứu thế?',
  ];

  return (
    <div className="max-w-2xl mx-auto text-center py-12 px-4">
      <h1 className="text-4xl font-bold text-primary-500 mb-6">MaristChat</h1>
      <p className="text-xl text-gray-600 mb-4">
        Giáo lý nhà Thờ trong tầm tay bạn
      </p>
      <p className="text-gray-500 mb-8">
        Hãy đặt tất cả các câu hỏi của bạn vào ChatGPT này để phục vụ Giáo hội.
        <br />
        Nhờ trí tuệ nhân tạo, bạn sẽ nhận được câu trả lời phù hợp với giáo lý
        Công giáo.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-full border transition-all duration-200 text-sm"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
