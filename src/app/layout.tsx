import "./globals.css";
import "./normalize.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import UserProvider from "@/components/UserProvider";

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
    <UserProvider>
      <html lang="en">
        <head>
          <meta
            name="google-site-verification"
            content="XIyWEArCncajvy-xk0teFmCszuaKGhKOLmUeUval8uY"
          />
        </head>
        <body>
          <AppRouterCacheProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster position="top-center" />
          </AppRouterCacheProvider>
        </body>
      </html>
    </UserProvider>
  );
}
