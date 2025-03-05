"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [products, setProducts] = useState<IProduct[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Fetch product details when cart changes
  useEffect(() => {
    async function fetchProducts() {
      if (Object.keys(cart).length === 0) {
        setProducts([]);
        return;
      }

      const productIds = Object.keys(cart).join(",");
      const response = await fetch(`/api/products?ids=${productIds}`);
      const data: IProduct[] = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, [cart]);

  // Remove item from cart
  function removeFromCart(productId: number) {
    const updatedCart = { ...cart };
    delete updatedCart[productId]; // Remove item
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center font-calibri">Cart</h2>

      {Object.keys(cart).length === 0 ? (
        <div className="flex flex-col justify-center items-center my-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0NFDkRbiBU3YN6StTz4TbcNYdrYTY-ZZoyw&s"
            alt="Empty Cart"
            className="w-40 h-40 object-contain"
          />
          <p className="font-medium mt-4">
            Your cart is empty, let&apos;s{" "}
            <button
              onClick={() => router.push("/")}
              className="text-emerald-500 underline"
            >
              shop!
            </button>
          </p>
        </div>
      ) : (
        <ul>
          {products.map((product) => {
            const quantity = cart[product.id] ?? 0;

            return (
              <li
                key={product.id}
                className="flex justify-between items-center border-b p-3"
              >
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
                  onClick={() => removeFromCart(product.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
