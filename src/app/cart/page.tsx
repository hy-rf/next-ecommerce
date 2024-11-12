'use client'
import Cart from '@/components/Cart'
import { useAuth } from '@/lib/auth'

export default function CartPage() {
  const { user } = useAuth();
  if(!user) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Login to use Cart</h1>
      </div>
    )
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Cart</h1>
      <Cart />
    </div>
  )
}