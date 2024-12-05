import React from 'react';
import Heading from '@/app/components/design/Heading';
import Breadcrumb from '@/app/components/design/BreackCumb';

// Kiểu dữ liệu của ContentData
type ContentData = {
  content: string;
};

// Hàm xử lý trùng lặp và phân tích JSON trong `content`
const processContent = (data: ContentData) => {
  const processedData: Record<string, string> = {};
  const seenKeys = new Map<string, number>();

  try {
    // Parse dữ liệu JSON trong content
    const nestedContent = JSON.parse(data.content);

    Object.keys(nestedContent).forEach((key) => {
      const value = nestedContent[key];

      if (!processedData[key]) {
        // Nếu key chưa tồn tại, thêm key gốc
        processedData[key] = value;
        seenKeys.set(key, 1);
      } else {
        // Nếu key đã tồn tại, thêm key với hậu tố _n
        const count = seenKeys.get(key)! + 1;
        seenKeys.set(key, count);
        processedData[`${key}_${count}`] = value;
      }
    });
  } catch (error) {
    console.error('Error parsing nested content:', error);
  }

  return processedData;
};

const Page = () => {
  const data = {
    content: `{
      "content": "doƯlor aute amet aliquip irure elit elit velit nostrud sit incididunt magna nostrud magna esse aute incididunt veniam pariatur ipsum dolor sed ipsum esse et in incididunt Duis incididunt enim",
      "description": "elit reprehenderit commodo cillum sed sit cillum sed nostrud do commodo aliquip dolor nostrud ea labore veniam irure sed in",
      "title": "dolor laboris in eiusmod cillum nulla eiusmod laboris consectetur adipiscing",
      "content": "dSolor aute amet aliquip irure elit elit velit nostrud sit incididunt magna nostrud magna esse aute incididunt veniam pariatur ipsum dolor sed ipsum esse et in incididunt Duis incididunt enim",
      "title": "dol2or laboris in eiusmod cillum nulla eiusmod laboris consectetur adipiscing"
    }`,
  };

  // Xử lý dữ liệu chỉ trong phần content
  const processedContent = processContent(data);

  // Thêm dữ liệu xử lý vào data để hiển thị đúng
  const finalData = {
    ...processedContent, // Dữ liệu đã xử lý (bao gồm key trùng lặp)
  };

  console.log('🚀 ~ Page ~ processedContent:', processedContent);

  return (
    <div>
      <Heading name="Event" />
      <Breadcrumb />
      <div>
        <h1>Processed Content</h1>
        {/* Hiển thị dữ liệu đã xử lý */}
        <pre>{JSON.stringify(finalData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Page;
