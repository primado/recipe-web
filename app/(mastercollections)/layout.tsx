
import Navbar from "@/components/universal/navbar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Recipe Management System | Collections",
  description: "Browse through various recipe collections",
};

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className=""> 
          <Navbar />
            {children}
        </div>
    );
  }