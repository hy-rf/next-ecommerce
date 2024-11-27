import Link from "next/link";
import { db } from "@/lib/firebase";
import { Product } from "@/models";
import { collection, getDocs } from "firebase/firestore";
import FilterComponent from "@/components/FilterComponent";
import { Card, List, ListItem, ListItemButton } from "@mui/material";
import React from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import { ListDivider, ListItemContent } from "@mui/joy";

interface ProductQueyuProp {
  keyword: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

async function getProducts(
  keyword: string = "",
  category: string = "",
  minPrice: number = 0,
  maxPrice: number = Infinity
): Promise<Product[]> {
  const productsRef = collection(db, "product");
  const productsSnapshot = await getDocs(productsRef);
  const products = productsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
  const filtered = products.filter(
    (product) =>
      product.price >= minPrice &&
      product.price <= maxPrice &&
      (keyword === "" ||
        product.name.toLowerCase().includes(keyword.toLowerCase()) ||
        product.description.toLowerCase().includes(keyword.toLowerCase())) &&
      (category === "" ||
        product.category.toLowerCase() === category.toLowerCase())
  );
  return filtered;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: ProductQueyuProp;
}) {
  const products = await getProducts(
    searchParams?.keyword,
    searchParams?.category,
    searchParams?.minPrice,
    searchParams?.maxPrice
  );
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <FilterComponent
        filterProps={{
          keyword: searchParams?.keyword || "",
          category: searchParams?.category || "",
          minPrice: searchParams?.minPrice || 0,
          maxPrice: searchParams?.maxPrice || Infinity,
        }}
        show={
          !!(
            searchParams?.keyword ||
            searchParams?.category ||
            searchParams?.minPrice ||
            searchParams?.maxPrice
          )
        }
      />
      {/* {searchParams?.keyword && (
        <div>
          <h3>Keyword</h3>
          <p>{searchParams.keyword}</p>
        </div>
      )}
      {searchParams?.category && (
        <div>
          <h3>Category</h3>
          <p>{searchParams.category}</p>
        </div>
      )}
      {(searchParams?.minPrice || searchParams?.maxPrice) && (
        <div>
          <h3>Price</h3>
          <p>{searchParams?.minPrice && searchParams.minPrice}</p>
          <p>{searchParams?.maxPrice && searchParams.maxPrice}</p>
        </div>
      )} */}
      <Card variant="outlined" sx={{ width: 300, p: 0 }}>
        <List sx={{ py: "var(--ListDivider-gap)" }}>
          {products.map((item, index) => (
            <React.Fragment key={item.name}>
              <Link href={`/product/${item.id}`}>
                <ListItem>
                  <ListItemButton sx={{ gap: 2 }}>
                    {/*<AspectRatio></AspectRatio>*/}
                    <img
                      className="w-20"
                      srcSet={item.imageUrl}
                      src={item.imageUrl}
                      alt={item.name}
                    />
                    <ListItemContent>
                      <Typography
                        className="truncate h-10"
                        sx={{ fontWeight: "md" }}
                      >
                        {item.name}
                      </Typography>
                      <Typography className="h-16 line-clamp-1" level="body-sm">
                        {item.description}
                      </Typography>
                      <Typography level="body-sm">{item.category}</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              </Link>
              {index !== products.length - 1 && <ListDivider />}
            </React.Fragment>
          ))}
        </List>
      </Card>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden max-h-96"
          >
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
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </>
  );
}
