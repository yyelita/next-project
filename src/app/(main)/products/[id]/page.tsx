"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface IProduct {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${params.id}`);

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data: IProduct = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!product)
    return <p className="text-center text-red-500">Product not found</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg overflow-hidden p-6">
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 cursor-pointer"
          onClick={() => router.back()}
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row items-center mt-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-48 h-48 object-contain bg-gray-100 p-4 rounded-md"
          />

          <div className="ml-6">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-emerald-600 font-semibold text-xl mt-2">
              ${product.price}
            </p>
            <p className="text-gray-500">Stock: {product.quantity}</p>

            <button className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-full text-lg hover:bg-emerald-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
