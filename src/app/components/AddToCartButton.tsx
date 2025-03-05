"use client";

import { useRouter } from "next/navigation";

interface CartItem {
  _id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface AddToCartButtonProps {
  product: CartItem;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const router = useRouter();
  const { data: session } = session();

  const addToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();

    console.log("Session value:", session);

    if (!session) {
      console.log("Redirecting to /login...");
      router.push("/login");
      return;
    }

    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    console.log("Cart Items before:", cart);

    const existingProduct = cart.find((item) => item._id === product._id);

    if (!existingProduct) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("Added to cart:", cart);
    } else {
      console.log("Product already exists in cart");
    }

    console.log("LocalStorage after:", localStorage.getItem("cart"));
  };

  return (
    <button
      onClick={addToCart}
      className="px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-semibold cursor-pointer hover:bg-emerald-800"
    >
      Add to Cart
    </button>
  );
}
