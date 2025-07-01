"use client";

import { useEffect, useState } from "react";

export default function ArticleTable() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("articles") || "[]");
    setArticles(stored);
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Daftar Artikel</h2>
      {articles.length === 0 ? (
        <p className="text-gray-600">Belum ada artikel disimpan.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Judul</th>
              <th className="p-3 border">Tanggal</th>
              <th className="p-3 border">Kategori</th>
              <th className="p-3 border">File</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-3 border">{article.title}</td>
                <td className="p-3 border">{article.date}</td>
                <td className="p-3 border">{article.category?.join(", ")}</td>
                <td className="p-3 border">
                  {article.fileType?.includes("image") && (
                    <img src={article.fileUrl} alt="preview" className="h-12" />
                  )}
                  {article.fileType === "application/pdf" && (
                    <a
                      href={article.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      📄 Lihat PDF
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
