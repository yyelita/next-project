"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Define a Product Type
interface IProduct {
  _id: string;
  title: string;
  image: string;
  quantity?: number;
}

export default function Cart() {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [products, setProducts] = useState<IProduct[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    setCart(storedCart);
  }, []);

  // Fetch product data
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

  // Remove item from cart
  const removeFromCart = (id: string) => {
    const updatedCart = { ...cart };
    delete updatedCart[id];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const cartItems = Object.entries(cart)
    .map(([id, quantity]) => {
      const product = products.find((p) => p._id === id);
      if (!product) return null;

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
    })
    .filter(Boolean); // Remove null values from the list

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
