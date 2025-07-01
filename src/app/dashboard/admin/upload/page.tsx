// File: src/app/dashboard/admin/upload/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  date: z.string(),
  category: z.string(),
  image: z.any()
});

export default function UploadPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: any) => {
    const stored = JSON.parse(localStorage.getItem("articles") || "[]");

    let imageUrl = "";
    if (data.image && data.image[0]) {
      imageUrl = URL.createObjectURL(data.image[0]);
    }

    const updated = [
      ...stored,
      {
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category.split(",").map((c: string) => c.trim()),
        image: imageUrl,
      },
    ];

    localStorage.setItem("articles", JSON.stringify(updated));
    router.push("/dashboard/admin");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload Artikel</h1>
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
          <label className="block font-medium">Gambar (opsional)</label>
          <input type="file" accept="image/*" {...register("image")} className="w-full border p-2 rounded bg-white" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </form>
    </div>
  );
}