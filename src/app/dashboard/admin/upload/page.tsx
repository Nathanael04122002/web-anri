"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  title: z.string().min(3, "Judul minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi minimal 10 karakter"),
  date: z.string(),
  category: z.string(),
  file: z.any(),
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

    let fileUrl = "";
    let fileName = "";
    let fileType = "";

    if (data.file && data.file[0]) {
      const file = data.file[0];
      fileUrl = URL.createObjectURL(file); // untuk preview lokal
      fileName = file.name;
      fileType = file.type;
    }

    const updated = [
      ...stored,
      {
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category.split(",").map((c: string) => c.trim()),
        fileUrl,
        fileName,
        fileType,
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
          <input
            {...register("title")}
            className="w-full border p-2 rounded"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Tanggal</label>
          <input
            type="date"
            {...register("date")}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Kategori (pisahkan dengan koma)</label>
          <input
            {...register("category")}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">File (Gambar atau PDF)</label>
          <input
            type="file"
            accept="image/*,.pdf"
            {...register("file")}
            className="w-full border p-2 rounded bg-white"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
