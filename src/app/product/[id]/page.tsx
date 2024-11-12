import { Product } from "@/models";

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

export async function generateMetadata({ params }: ProductDetailProps) {
  const { id } = params;
  const result = await getProduct(id);
  return {
    title: result.name,
    description: result.description,
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
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
}
