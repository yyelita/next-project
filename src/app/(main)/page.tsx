"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface IProduct {
  _id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  quantity?: number;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function fetchProducts() {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data: IProduct[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch() {
    setTimeout(() => {}, 1000);
    try {
      setLoading(true);
      const res = await fetch(`/api/products?query=${search}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error searching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!search) {
      fetchProducts();
      return;
    }

    handleSearch();
  }, [search]);

  const addToCart = (product: IProduct) => {
    const cart: IProduct[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="flex flex-col p-6">
      <div className="flex justify-center">
        <input
          className="rounded-full flex w-1/2 sm:text-sm px-3 py-2 border border-b-slate mb-6"
          placeholder="Search product..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : products.length == 0 ? (
          <p className="text-center text-red-500">No products found</p>
        ) : (
          <>
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link href={`/products/${product._id}`} className="block">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-56 object-contain p-4 bg-gray-100"
                  />
                </Link>
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-gray-600 text-sm truncate">
                    {product.category}
                  </p>
                  <p className="text-emerald-600 font-bold text-lg mt-2">
                    ${product.price}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-500">
                      ⭐ {product.rating.rate} ({product.rating.count} reviews)
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-semibold cursor-pointer hover:bg-emerald-800"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
