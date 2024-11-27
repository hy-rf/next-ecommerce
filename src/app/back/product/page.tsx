import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Product } from "@/models";
async function getProducts(): Promise<Product[]> {
  const productsRef = collection(db, "product");
  const productsSnapshot = await getDocs(productsRef);
  const products = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
  return products;
}
export const dynamic = "force-dynamic";
export default async function Page() {
  const products: Product[] = await getProducts();
  // const [users, setUsers] = useState<User[]>([]);
  // const [carts, setCarts] = useState<Cart[]>([]);
  // const [orders, setOrders] = useState<Order[]>([]);

  // useEffect(() => {
  //   fetchProducts();
  //   fetchUsers();
  //   fetchCarts();
  //   fetchOrders();
  // }, []);

  // const fetchProducts = async () => {
  //   const productsCollection = collection(db, "product");
  //   const productSnapshot = await getDocs(productsCollection);
  //   const products = productSnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   })) as Product[];
  //   setProducts(products);
  // };

  // const fetchUsers = async () => {
  //   const usersCollection = collection(db, "users");
  //   const userSnapshot = await getDocs(usersCollection);
  //   const users = userSnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   })) as User[];
  //   setUsers(users);
  // };

  // const fetchCarts = async () => {
  //   const cartsCollection = collection(db, "carts");
  //   const cartSnapshot = await getDocs(cartsCollection);
  //   const carts = cartSnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   })) as Cart[];
  //   setCarts(carts);
  // };

  // const fetchOrders = async () => {
  //   const ordersCollection = collection(db, "orders");
  //   const orderSnapshot = await getDocs(ordersCollection);
  //   const orders = orderSnapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   })) as Order[];
  //   setOrders(orders);
  // };

  // const handleAddProduct = async (newProduct: Product) => {
  //   const productsCollection = collection(db, "product");
  //   await addDoc(productsCollection, newProduct);
  //   fetchProducts();
  // };

  // const handleUpdateProduct = async (id: string, updatedProduct: Product) => {
  //   try {
  //     const productDoc = doc(db, "product", id);
  //     await updateDoc(productDoc, { ...updatedProduct });
  //     fetchProducts();
  //     toast.success("update success");
  //   } catch (error) {
  //     toast.error("fail" + error);
  //   }
  // };

  // const handleDeleteProduct = async (id: string) => {
  //   try {
  //     const productDoc = doc(db, "product", id);
  //     await deleteDoc(productDoc);
  //     toast.success("delete success");
  //     fetchProducts();
  //   } catch (error) {
  //     toast.error("fail" + error);
  //   }
  // };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Backstage Management</h1>
      <h2 className="text-2xl font-bold mb-2">Product List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b">
                  <a href={`/product/${product.id}`}>{product.name}</a>
                </td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-4 border-b">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">{product.category}</td>
                <td className="py-2 px-4 border-b">
                  {/* <button
                    onClick={() => handleUpdateProduct(product.id, product)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
