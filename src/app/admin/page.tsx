'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'

const articles = [
  {
    id: 1,
    title: 'Cybersecurity Essentials Every Developer Should Know',
    date: 'April 13, 2025',
    category: ['Technology', 'Design'],
    image: '/images/article1.jpg',
  },
  {
    id: 2,
    title: 'The Future of Work: Remote Teams & Digital Tools',
    date: 'April 10, 2025',
    category: ['Technology', 'Design'],
    image: '/images/article2.jpg',
  },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header */}
      <div className="bg-[#2166f3] text-white py-10 px-8">
        <h1 className="text-3xl font-bold max-w-4xl mx-auto">
          The Journal : Design Resources, Interviews, and Industry News
        </h1>
        <p className="text-lg mt-2 max-w-4xl mx-auto">
          Your daily dose of design insights!
        </p>
        <div className="flex gap-4 mt-6 max-w-4xl mx-auto">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="tech">Technology</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Search articles..." className="w-full" />
        </div>
      </div>

      {/* Article Cards */}
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <p className="mb-4">Showing: {articles.length} of 240 articles</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <p className="text-sm text-gray-500 mb-1">{article.date}</p>
                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {article.category.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
