import Image from "next/image";

interface ArticleProps {
  title: string;
  date: string;
  category: string[];
  image: string;
}

export default function ArticleCard({ title, date, category, image }: ArticleProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-sm">
      <Image
        src={image}
        alt={title}
        width={400}
        height={250}
        className="rounded-md mb-4 object-cover w-full h-48"
      />
      <p className="text-sm text-gray-500">{formattedDate}</p>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {category.map((cat) => (
          <span
            key={cat}
            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
