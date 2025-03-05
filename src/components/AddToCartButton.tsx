"use client";

import { useCart } from "@/app/hooks/useCart";
interface AddToCartButtonProps {
  productId: string;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { stock, addToCart } = useCart(); // Use the shared cart state

  return (
    <button
      onClick={() => addToCart(productId)}
      className={`px-4 py-2 rounded-full text-xs font-semibold cursor-pointer 
        ${
          stock[productId] > 0
            ? "bg-emerald-600 text-white hover:bg-emerald-800"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      disabled={stock[productId] <= 0}
    >
      {stock[productId] > 0 ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
