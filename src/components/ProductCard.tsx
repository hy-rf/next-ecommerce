"use client";
import { Product } from "@/models";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-h-96">
      <Link href={`/product/${product.id}`}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold">{product.name}</h3>
        </Link>
        <p className="text-gray-600 whitespace-nowrap break-words text-ellipsis max-h-7 overflow-hidden">
          {product.description}
        </p>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mt-1">
          Category: {product.category}
        </p>
        <button
          onClick={() => addToCart(product, 1)}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
