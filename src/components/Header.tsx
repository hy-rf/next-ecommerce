"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useContext, useState } from "react";
import "./Header.css";
import UserContext from "./UserContext";

export default function Header() {
  const user = useContext(UserContext);
  const [isVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (isMenuOpen) {
      document.querySelector(".mobile-menu")?.classList.add("hide");
      setTimeout(() => {
        setIsMenuOpen((prev) => !prev);
      }, 500);
      return;
    }
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={isVisible ? "show-header" : ""}>
      <nav>
        <Link href="/" className="header-link">
          Modern E-Shop
        </Link>
        {/* links for desktop */}
        <div className="links-container">
          <Link href="/product">Product</Link>
          {user ? (
            <>
              <Link href="/user">User</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/seller">Seller</Link>
              <Link href="/user/login">Log out</Link>
            </>
          ) : (
            <Link href="/user/login">Login</Link>
          )}
        </div>
        <button className="toggle-menu-button" onClick={toggleMenu}>
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </nav>
      {/* links for mobile */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link href="/product" onClick={toggleMenu}>
            Product
          </Link>
          {user ? (
            <>
              <Link href="/user" onClick={toggleMenu}>
                User
              </Link>
              <Link href="/cart" onClick={toggleMenu}>
                Cart
              </Link>
              <Link href="/seller" onClick={toggleMenu}>
                Seller
              </Link>
              <Link href="/user/login" onClick={toggleMenu}>
                Log out
              </Link>
            </>
          ) : (
            <Link href="/user/login" onClick={toggleMenu}>
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
