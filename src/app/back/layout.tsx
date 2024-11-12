import Header from "@/components/Header"; // Import your Header component
import Footer from "@/components/Footer"; // Import your Footer component
import { ReactNode } from "react";
import Link from "next/link";

interface BackstageLayoutProps {
  children: ReactNode; // This will hold the content of the page
}

export default function BackstageLayout({ children }: BackstageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <Link href="/back/product">Products</Link>
      </nav>
      <section className="flex-grow container mx-auto px-4 py-8">
        {children}
      </section>
    </div>
  );
}
