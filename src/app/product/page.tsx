"use client";
import { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import FilterComponent from "@/components/FilterComponent";
import { db } from "@/lib/firebase";
import { Product } from "@/models";
import { collection, getDocs } from "firebase/firestore";
async function getProducts(): Promise<Product[]> {
  const productsRef = collection(db, "products");
  const productsSnapshot = await getDocs(productsRef);
  const products = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
  return products;
}
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts().then((fetchedProducts) => {
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    });
  }, []);
  const handleFilterChange = (
    minPrice: number,
    maxPrice: number,
    keyword: string,
    category: string
  ) => {
    const filtered = products.filter(
      (product) =>
        product.price >= minPrice &&
        product.price <= maxPrice &&
        (keyword === "" ||
          product.name.toLowerCase().includes(keyword.toLowerCase()) ||
          product.description.toLowerCase().includes(keyword.toLowerCase())) &&
        (category === "" ||
          product.category.toLowerCase() === category.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <div className="flex flex-col md:flex-row">
        <FilterComponent onFilterChange={handleFilterChange} />
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
