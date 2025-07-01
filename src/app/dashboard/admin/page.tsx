"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles") || "[]");
    setArticles(storedArticles);
  }, []);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Daftar Artikel</h1>
        <Button onClick={() => router.push("/dashboard/admin/upload")}>
          + Tambah Artikel
        </Button>
      </div>

      {articles.length === 0 ? (
        <p className="text-muted-foreground">Belum ada artikel ditambahkan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div
              key={index}
              className="border rounded-xl shadow-sm p-4 bg-white dark:bg-gray-900 transition hover:shadow-md"
            >
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="font-semibold text-lg">{article.title}</h2>
              <p className="text-sm text-muted-foreground">{article.description}</p>
              <p className="text-xs mt-2 text-gray-500">📅 {article.date}</p>
              <p className="text-xs text-gray-500">🏷️ {article.categories.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
