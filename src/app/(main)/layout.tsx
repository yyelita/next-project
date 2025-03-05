"use client"; // ✅ Mark as a Client Component

import { logout } from "@/app/actions/auth"; // ✅ Import the logout function
import { useRouter } from "next/navigation"; // ✅ Import useRouter for navigation
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading] = useState(false);
  const router = useRouter(); // ✅ Use useRouter for client-side navigation

  function handleCart(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    router.push("/cart"); // ✅ Navigate to /cart properly
  }

  return (
    <>
      <header className="bg-green-500 h-12 text-xl px-7 py-2 flex justify-between">
        <h1 className="text-white font-arial font-bold cursor-pointer">
          HacktivStore
        </h1>
        <input
          className="rounded-full flex w-1/2 sm:text-sm px-3 border border-b-slate"
          placeholder="Search product..."
        />
        <div className="flex">
          <button
            onClick={handleCart} // ✅ Works correctly now
            className="border border-white rounded-full py-1 px-3 cursor-pointer text-white mx-1.5"
          >
            <div className="text-sm text-center">Cart</div>
          </button>

          {/* ✅ Logout Button */}
          <form action={logout}>
            <button
              type="submit"
              className="border bg-green-600 border-white rounded-full py-1 px-3 cursor-pointer text-white"
              disabled={loading}
            >
              <div className="text-sm font-bold text-center">
                {loading ? "Logging out..." : "Log Out"}
              </div>
            </button>
          </form>
        </div>
      </header>
      {children}
    </>
  );
}
