import Link from "next/link";
import { cookies } from "next/headers";
import "../globals.css";
import LogoutButton from "@/components/LogoutButton";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Get session from cookies (server-side)
  const cookieStore = await cookies();
  const session = cookieStore.get("session"); // Check if user is logged in

  return (
    <div>
      <header className="bg-green-500 h-12 text-xl px-7 py-2 flex justify-between">
        <h1 className="text-white font-arial font-bold cursor-pointer">
          HacktivStore
        </h1>
        <input
          className="rounded-full flex w-1/2 sm:text-sm px-3 border border-b-slate"
          placeholder="Search product..."
        />
        <div className="flex">
          {session ? (
            <>
              <Link
                href="/cart"
                className="border border-white rounded-full py-1 px-3 cursor-pointer text-white mx-1.5"
              >
                <div className="text-sm text-center">Cart</div>
              </Link>
              <LogoutButton /> {/* ✅ Server-side logout handling */}
            </>
          ) : (
            <>
              <Link href="/login" className="text-white font-semibold mx-2">
                Masuk
              </Link>
              <Link href="/register" className="text-white font-semibold">
                Daftar
              </Link>
            </>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}
