"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, signIn, signOut } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={isVisible ? "show-header" : ""}>
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Modern E-Shop
        </Link>
        {/* hide toggleMenuButton if screen width is larger than medium(768px) */}
        <button onClick={toggleMenu} className="md:hidden p-2">
          {isMenuOpen ? "Close" : "Menu"}
        </button>
        <div className="hidden md:flex md:flex-row md:items-center">
          <Link href="/product" className="mr-4 hover:text-gray-300">
            Product
          </Link>
          <Link href="/cart" className="mr-4 hover:text-gray-300">
            Cart
          </Link>
          <Link href="/help" className="mr-4 hover:text-gray-300">
            Help
          </Link>
          {user ? (
            <>
              <Link href="/user" className="mr-4 hover:text-gray-300">
                User
              </Link>
              <Link href="/seller" className="mr-4 hover:text-gray-300">
                Seller
              </Link>
              <button onClick={signOut} className="mr-4 hover:text-gray-300">
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={signIn} className="hover:text-gray-300">
              Sign In with Google
            </button>
          )}
        </div>
      </nav>

      {isMenuOpen && (
        <div className="mobile-menu fixed top-18 bg-opacity-90 flex flex-col items-center justify-start h-svh w-full z-20">
          <Link
            href="/product"
            className="text-white text-lg mb-4"
            onClick={toggleMenu}
          >
            Product
          </Link>
          <Link
            href="/cart"
            className="text-white text-lg mb-4"
            onClick={toggleMenu}
          >
            Cart
          </Link>
          <Link
            href="/help"
            className="text-white text-lg mb-4"
            onClick={toggleMenu}
          >
            Help
          </Link>
          {user ? (
            <>
              <Link
                href="/user"
                className="text-white text-lg mb-4"
                onClick={toggleMenu}
              >
                User
              </Link>
              <Link
                href="/seller"
                className="text-white text-lg mb-4"
                onClick={toggleMenu}
              >
                Seller
              </Link>
              <button onClick={signOut} className="text-white text-lg mb-4">
                Sign Out
              </button>
            </>
          ) : (
            <button onClick={signIn} className="text-white text-lg mb-4">
              Sign In with Google
            </button>
          )}
        </div>
      )}
    </header>
  );
}
