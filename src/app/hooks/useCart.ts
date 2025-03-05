"use client";

import { useState, useEffect } from "react";

export function useCart() {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [stock, setStock] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    setCart(storedCart);

    const storedStock = JSON.parse(localStorage.getItem("stock") || "{}");
    if (Object.keys(storedStock).length > 0) {
      setStock(storedStock);
    } else {
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          const initialStock: { [key: string]: number } = {};
          data.forEach((product: { _id: string; quantity: number }) => {
            initialStock[product._id] = product.quantity;
          });
          setStock(initialStock);
          localStorage.setItem("stock", JSON.stringify(initialStock));
        })
        .catch((error) => console.error("Error fetching stock:", error));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("stock", JSON.stringify(stock));
  }, [cart, stock]);

  function addToCart(id: string) {
    if (stock[id] > 0) {
      setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      setStock((prev) => ({ ...prev, [id]: prev[id] - 1 }));
    }
  }

  function removeFromCart(id: string) {
    if (cart[id] > 0) {
      setCart((prev) => {
        const updatedCart = { ...prev, [id]: prev[id] - 1 };
        if (updatedCart[id] === 0) delete updatedCart[id];
        return updatedCart;
      });
      setStock((prev) => ({ ...prev, [id]: prev[id] + 1 }));
    }
  }

  return { cart, stock, addToCart, removeFromCart };
}
