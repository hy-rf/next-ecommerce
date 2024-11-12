"use client";
import ProductList from "@/components/ProductList";
import { Product } from "@/models";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import "./page.css";
async function getProducts(): Promise<Product[]> {
  const productsRef = collection(db, "products");
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
  useEffect(() => {
    setInterval(() => {});
  }, []);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % topProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + topProducts.length) % topProducts.length
    );
  };

  return (
    <div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white px-1 py-2"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-600 text-white px-1 py-2"
      >
        &gt;
      </button>
      <div className="carousel">
        <div className="overflow-hidden z-[-100]">
          {topProducts.length > 0 && (
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {topProducts.map((product) => (
                <div key={product.id} className="min-w-full p-4 justify-center">
                  <a href={`/product/${product.id}`}>
                    <img src={product.imageUrl} alt={product.name} />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
