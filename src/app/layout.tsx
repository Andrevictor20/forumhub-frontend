import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { ToastProvider } from "@/components/providers/ToastProvider"; // Importar
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
        <ToastProvider /> {/* Adicionar o provedor */}
        <Header />
        <main>{children}</main> {/* Envolver children com <main> */}
      </body>
    </html>
  );
}
