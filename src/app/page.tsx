"use client";
import { Product } from "@/models";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import "./page.css";
import { Skeleton } from "@mui/material";

async function getProducts(): Promise<Product[]> {
  const productsRef = collection(db, "product");
  const productsSnapshot = await getDocs(productsRef);
  const products = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
  return products;
}

export default function Home() {
  const [topProducts, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    getProducts().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });
  }, []);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % topProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + topProducts.length) % topProducts.length,
    );
  };
  // the function must update when currentIndex updates
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, topProducts]);

  return (
    <>
      <div className="carousel">
        <button onClick={prevSlide} className="carousel-button left-button">
          &lt;
        </button>
        <button onClick={nextSlide} className="carousel-button right-button">
          &gt;
        </button>
        {topProducts.length > 0 ? (
          <>
            <div
              className="carousel-wrapper"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {topProducts.map((product) => (
                <div key={product.id} className="carousel-item">
                  <a href={`/product/${product.id}`}>
                    <img src={product.imageUrl} alt={product.name} />
                    <div className="carousel-item-detail">
                      <h3 className="product-name">{product.name}</h3>
                      <p className="product-price">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <div className="carousel-dots">
              {topProducts.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(index)}
                ></span>
              ))}
            </div>
          </>
        ) : (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 1)", // Optional: adds a semi-transparent background
              zIndex: 1000, // Optional: ensures it stays on top
              transition: "0.5s",
            }}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              width="100%"
              height="100%"
            />
          </div>
        )}
      </div>
    </>
  );
}
