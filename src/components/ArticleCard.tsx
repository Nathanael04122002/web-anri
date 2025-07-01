import React from 'react';

interface ArticleCardProps {
  title: string;
  description: string;
  date: string;
  category: string[];
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, date, category }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-600">{date}</p>
      <p className="mt-2">{description}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {category.map((cat, idx) => (
          <span key={idx} className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded">
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArticleCard;
