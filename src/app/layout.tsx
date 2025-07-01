// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Web Artikel",
  description: "Aplikasi manajemen artikel dengan Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-100 text-gray-800">{children}</body>
    </html>
  );
}
