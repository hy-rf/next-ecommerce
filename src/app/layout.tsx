import "./globals.css";
import "./reset.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Modern E-Shop",
  description:
    "A Next.js e-commerce website with Google login and MetaMask payments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="XIyWEArCncajvy-xk0teFmCszuaKGhKOLmUeUval8uY"
        />
      </head>
      <body>
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow pt-16">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
