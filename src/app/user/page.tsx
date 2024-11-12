"use client";
import { useAuth } from "@/lib/auth";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Order } from "@/models";

export default function UserPage() {
  const { user } = useAuth();
  const [orderCount, setOrderCount] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      const fetchOrderCount = async () => {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        setOrderCount(querySnapshot.size);
        const fetchedOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
        setOrders(fetchedOrders);
      };
      fetchOrderCount();
    }
  }, [user]);
  console.log(orders);

  if (!user) {
    return <div className="text-center mt-10">Please sign in to view your profile.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 text-gray-600 dark:text-slate-300">
      <div className="flex flex-col md:flex-row items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{user.displayName}</h1>
          <p className="">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
          <h2 className="text-xl font-semibold mb-2">Account Details</h2>
          <p><strong>User ID:</strong> {user.uid}</p>
          <p><strong>Email verified:</strong> {user.emailVerified ? "Yes" : "No"}</p>
          <p><strong>Account created:</strong> {user.metadata.creationTime}</p>
          <p><strong>Last sign in:</strong> {user.metadata.lastSignInTime}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
          <h2 className="text-xl font-semibold mb-2">Activity</h2>
          <p><strong>Total orders:</strong> {orderCount}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        {orders.length > 0 ? (
          <ul className="list-disc pl-5">
            {orders.map(order => (
              <li key={order.id} className="mb-2">
                <strong>Order ID:</strong> {order.id} - Total: ${order.total.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No recent orders to display.</p>
        )}
      </div>
    </div>
  );
}