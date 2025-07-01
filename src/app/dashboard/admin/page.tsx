"use client";

import { Button } from "@/components/ui/button";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("articles") || "[]");
    setArticles(stored);
  }, []);

  const handleDelete = (index: number) => {
    const confirmDelete = confirm("Yakin ingin menghapus artikel ini?");
    if (!confirmDelete) return;

    const updated = [...articles];
    updated.splice(index, 1);
    localStorage.setItem("articles", JSON.stringify(updated));
    setArticles(updated);
  };

  const handleEdit = (index: number) => {
    router.push(`/dashboard/admin/edit/${index}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-blue-200 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          📚 Daftar Artikel
        </h1>
        <Link href="/dashboard/admin/upload">
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:scale-105 transition-transform">
            <CirclePlus className="w-4 h-4 mr-2" />
            Tambah Artikel
          </Button>
        </Link>
      </div>

      {articles.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-20"
        >
          <Image
            src="/empty-articles.svg"
            alt="Empty"
            width={250}
            height={250}
            className="mx-auto"
          />
          <p className="text-gray-600 mt-6 text-lg font-medium">
            Belum ada artikel ditambahkan.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-4 relative"
            >
              <div className="absolute top-2 right-2 flex gap-2">
                <Button variant="outline" size="icon" onClick={() => handleEdit(index)}>
                  <Pencil className="w-4 h-4 text-blue-600" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDelete(index)}>
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{article.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{article.date}</p>
              <p className="text-gray-700 mb-2">{article.description}</p>
              <p className="text-sm text-blue-500 mb-2">
                Kategori: {article.category?.join(", ")}
              </p>
              {article.fileType?.includes("image") && (
                <img
                  src={article.fileUrl}
                  alt="uploaded"
                  className="w-full rounded mt-2"
                />
              )}
              {article.fileType === "application/pdf" && (
                <a
                  href={article.fileUrl}
                  target="_blank"
                  className="text-blue-600 underline mt-2 inline-block"
                >
                  📄 Lihat PDF
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
