'use client'
import { Cart, Product, Order } from "@/models";
import { useState, useEffect } from "react";
import { db } from './firebase';
import { collection, doc, getDoc, updateDoc, arrayUnion, arrayRemove, getDocs, addDoc } from 'firebase/firestore';
import { useAuth } from './auth';
import toast from "react-hot-toast";

export function useCart() {
  const [cart, setCart] = useState<Cart>({ id: '', userId: '', items: [] });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;
    const cartRef = doc(db, 'user', user.uid, 'cart', 'active');
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      setCart(cartSnap.data() as Cart);
    } else {
      // Initialize an empty cart if it doesn't exist
      const newCart: Cart = { id: 'active', userId: user.uid, items: [] };
      await updateDoc(cartRef, { ...newCart });
      setCart(newCart);
    }
  };

  const addToCart = async (product: Product, quantity: number) => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return
    };
    try {
      const cartRef = doc(db, 'user', user.uid, 'cart', 'active');
      await updateDoc(cartRef, {
        items: arrayUnion({ product, quantity })
      });
      toast.success('Item added to cart');
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
    await fetchCart();
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (!user) return;
    const cartRef = doc(db, 'user', user.uid, 'cart', 'active');
    const updatedItems = cart.items.map(item =>
      item.product.id === productId ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ).filter(item => item.quantity > 0);
    await updateDoc(cartRef, { items: updatedItems });
    await fetchCart();
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;
    try {
      const cartRef = doc(db, 'user', user.uid, 'cart', 'active');
      const itemToRemove = cart.items.find(item => item.product.id === productId);
      if (itemToRemove) {
        await updateDoc(cartRef, {
          items: arrayRemove(itemToRemove)
        });
        await fetchCart();
        toast.success('Item removed from cart');
      }
    } catch (error) {
      toast.error('Failed to remove item from cart');
    }
  };

  // Add this function to place an order
  const placeOrder = async () => {
    if (!user) return;

    const order: Order = {
      id: `order_${Date.now()}`, // Unique order ID
      userId: user.uid,
      items: cart.items,
      total: cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      createdAt: new Date(),
    };

    try {
      const ordersRef = collection(db, 'orders');
      await addDoc(ordersRef, order);
      toast.success('Order placed successfully!');
      setCart({ id: '', userId: '', items: [] }); // Clear the cart after placing the order
    } catch (error) {
      toast.error(`Failed to place order. Please try again.${error}`);
    }
  };

  return { cart, setCart, addToCart, updateQuantity, removeFromCart, placeOrder };
}