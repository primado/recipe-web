import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/universal/navbar";
import TanstackQueryProvider from "@/providers/tanstackQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe Management System",
  description: "A Recipe Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackQueryProvider>
          <Navbar />
          {children}
        
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
