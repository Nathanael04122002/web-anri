// src/app/dashboard/articles/page.tsx
import { Card } from "@/components/ui/card"
import ArticleCard from "@/components/ArticleCard"
import ArticleTable from "@/components/ArticleTable"

const articles = [
  {
    title: "Cybersecurity Essentials Every Developer Should Know",
    date: "April 13, 2025",
    tags: ["Technology", "Design"],
    thumbnail: "/articles/1.jpg",
    category: "Technology",
  },
  {
    title: "The Future of Work: Remote-First Teams and Digital Tools",
    date: "April 13, 2025",
    tags: ["Technology", "Design"],
    thumbnail: "/articles/2.jpg",
    category: "Technology",
  },
  {
    title: "Web3 and the Decentralized Internet: What You Need to Know",
    date: "April 7, 2025",
    tags: ["Technology", "Design"],
    thumbnail: "/articles/3.jpg",
    category: "Technology",
  },
]

export default function ArticlePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Left Section - Article Cards */}
      <div className="md:col-span-2 grid gap-4">
        <h1 className="text-2xl font-bold">Articles</h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article, i) => (
            <ArticleCard key={i} {...article} />
          ))}
        </div>
      </div>

      {/* Right Section - Table */}
      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <ArticleTable data={articles} />
      </div>
    </div>
  )
}