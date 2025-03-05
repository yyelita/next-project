"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface IProduct {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (products.length === 0)
    return <p className="text-center text-red-500">No products found</p>;

  return (
    <div className="min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="block"
            >
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
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-emerald-800 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
