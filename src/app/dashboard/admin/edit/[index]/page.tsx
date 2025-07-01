"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function EditArticlePage() {
  const router = useRouter();
  const { index } = useParams();
  const idx = Number(index);
  const [initialData, setInitialData] = useState<any>(null);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("articles") || "[]");
    const current = stored[idx];
    if (current) {
      setInitialData(current);
      setValue("title", current.title);
      setValue("description", current.description);
      setValue("date", current.date);
      setValue("category", current.category.join(", "));
    }
  }, [idx, setValue]);

  const onSubmit = (data: any) => {
    const stored = JSON.parse(localStorage.getItem("articles") || "[]");
    const file = data.image?.[0];
    let fileUrl = stored[idx].fileUrl;
    let fileType = stored[idx].fileType;

    if (file) {
      fileUrl = URL.createObjectURL(file);
      fileType = file.type;
    }

    stored[idx] = {
      title: data.title,
      description: data.description,
      date: data.date,
      category: data.category.split(",").map((c: string) => c.trim()),
      fileUrl,
      fileType,
    };

    localStorage.setItem("articles", JSON.stringify(stored));
    router.push("/dashboard/admin");
  };

  if (!initialData) return <div className="p-6">Memuat...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Artikel</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Judul</label>
          <input {...register("title")} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea {...register("description")} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-medium">Tanggal</label>
          <input type="date" {...register("date")} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-medium">Kategori (pisahkan dengan koma)</label>
          <input {...register("category")} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block font-medium">Upload baru (opsional)</label>
          <input type="file" accept="image/*,application/pdf" {...register("image")} className="w-full border p-2 rounded bg-white" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
