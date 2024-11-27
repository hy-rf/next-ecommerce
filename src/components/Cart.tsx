"use client";
import { useCart } from "@/lib/cart";
import Link from "next/link";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, placeOrder } = useCart();
  // const { connectWallet, pay } = useMetaMask()

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.items.map((item) => (
        <>
          <div
            key={item.product.id}
            className="flex items-center justify-between mb-4"
          >
            <div>
              <Link href={`/product/${item.product.id}`}>
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
              </Link>
              <p>
                ${item.product.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
            <div>
              <button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
                }
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="ml-4 text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        </>
      ))}
      <div className="mt-4">
        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
        <button
          onClick={placeOrder}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
