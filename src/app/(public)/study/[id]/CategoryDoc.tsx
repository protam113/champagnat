import { DocList } from '@/lib/docList';
import React from 'react';

const CategoryDoc = ({ category }: { category: string }) => {
  const { queueData } = DocList(1, category, 0);
  return (
    <div>
      {queueData.map((post) => (
        <div
          key={post.id}
          className="border rounded-lg overflow-hidden shadow-lg"
        >
          <div className="p-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 uppercase font-semibold">
              {Array.isArray(post.categories) ? (
                post.categories.map((category, index) => (
                  <span key={index} className="inline-block">
                    {category.name}
                  </span>
                ))
              ) : (
                <span>{post.categories}</span>
              )}
            </div>
            <h2 className="text-xl line-clamp-2 font-semibold text-gray-800 mt-2">
              {post.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryDoc;
