import { Product } from "@/models";
import { Metadata } from "next";
import AddToCartButton from "./_component/AddToCartButton";

// import { useCart } from "@/lib/cart";
interface ProductDetailProps {
  params: {
    id: string;
  };
}
async function getProduct(id: string): Promise<Product> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/product/api/${id}`
  );
  const data = await response.json();
  return data as Product;
}

export async function generateMetadata({
  params,
}: ProductDetailProps): Promise<Metadata> {
  const { id } = params;
  const result = await getProduct(id);
  return {
    title: result.name,
    description: result.description,
    keywords: `${result.name}, ${result.category}`,
    openGraph: {
      title: result.name,
      description: result.description,
      url: `${process.env.NEXT_PUBLIC_URL}/product/${id}`,
      images: [
        {
          url: result.imageUrl,
          width: 800,
          height: 600,
          alt: result.name,
        },
      ],
      siteName: "Modern-Eshop",
    },
  };
}

export default async function Page({ params }: ProductDetailProps) {
  const { id } = params;
  // const { addToCart } = useCart();
  const product: Product = await getProduct(id);

  // if (!product) {
  //   return <div>Product not found</div>;
  // }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-auto mb-4"
      />
      <p className="text-gray-600 mb-4">{product.description}</p>
      {/* <p className="text-lg font-semibold">${product.price.toFixed(2)}</p> */}
      <p className="text-sm text-gray-500 mt-1">Category: {product.category}</p>
      <AddToCartButton product={product} />
    </div>
  );
}
