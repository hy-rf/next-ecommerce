import { NextRequest } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id);

  if (!id) {
    return Response.json({ error: "Missing or invalid 'id' parameter" });
  }

  const productRef = doc(db, "product", id);
  const productSnap = await getDoc(productRef);

  if (productSnap.exists()) {
    return Response.json(productSnap.data());
  } else {
    return Response.json({ error: "Product not found" }); // Handle the case where the product does not exist
  }
}
