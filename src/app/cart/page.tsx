"use client";
import Cart from "@/components/Cart";
import PaypalPayment from "@/components/PaypalPayment";
import UserContext from "@/components/UserContext";
import { useContext } from "react";

export default function CartPage() {
  const user = useContext(UserContext);
  if (!user) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Login to use Cart</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Cart</h1>
      <Cart />
      <PaypalPayment />
    </div>
  );
}
