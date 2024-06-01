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
          
              {children}
            
            <Toaster 
               toastOptions={{
                unstyled: false,
                classNames: {
                  error: 'bg-red-600',
                  success: 'text-green-600',
                  warning: 'text-yellow-600',
                  info: 'bg-blue-600',
                  title: "text-black",
                  closeButton: "text-black"
                },
              }}
            />
          </TanstackQueryProvider>

         
      </body>
    </html>
  );
}
