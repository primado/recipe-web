import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/universal/navbar";
import TanstackQueryProvider from "@/providers/tanstackQueryProvider";
import { Toaster } from "sonner"
import AllowedPages from "@/providers/accessPages";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe Management System",
  description: "A Recipe Management System to share your favorite recipes.",
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
          <Toaster 
              position="bottom-right"
              closeButton={true}
              duration={3000}
            />
              {children}
          
          </TanstackQueryProvider>

         
      </body>
    </html>
  );
}
