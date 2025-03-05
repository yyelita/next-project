"use client";
import { useCart } from "@/app/hooks/useCart";
import { useState, useEffect } from "react";
import Link from "next/link";

// 1️⃣ Define a Product Type
interface IProduct {
  _id: string;
  title: string;
  image: string;
}

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const [products, setProducts] = useState<IProduct[]>([]); // 2️⃣ Ensure products have a type

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: IProduct[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  const cartItems = Object.entries(cart).map(([id, quantity]) => {
    // 3️⃣ Use explicit typing in .find()
    const product = products.find((p: IProduct) => p._id === id);
    if (!product) return null; // Prevent errors when product is not found

    return (
      <li key={id} className="flex justify-between items-center border-b p-3">
        <div className="flex items-center gap-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-16 h-16 object-cover rounded-md"
          />
          <span className="text-lg font-semibold text-black">
            {product.title} - {quantity} pcs
          </span>
        </div>
        <button
          onClick={() => removeFromCart(id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
        >
          Remove
        </button>
      </li>
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center">Cart</h2>
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center my-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0NFDkRbiBU3YN6StTz4TbcNYdrYTY-ZZoyw&s"
            alt="Empty Cart"
            className="w-40 h-40 object-contain"
          />
          <p className="font-medium mt-4">
            Your cart is empty, let&apos;s{" "}
            <Link href="/" className="text-emerald-500 underline">
              shop!
            </Link>
          </p>
        </div>
      ) : (
        <ul>{cartItems}</ul>
      )}
    </div>
  );
}
