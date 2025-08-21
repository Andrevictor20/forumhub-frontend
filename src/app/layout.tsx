import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header"; // IMPORTAR O HEADER
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ForumHub",
  description: "Plataforma de fórum para discussões e aprendizado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        <Header /> {/* ADICIONAR O HEADER AQUI */}
        {children}
      </body>
    </html>
  );
}