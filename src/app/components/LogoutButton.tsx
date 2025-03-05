"use client";
import { logout } from "@/app/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="border bg-green-600 border-white rounded-full py-1 px-3 cursor-pointer text-white"
      >
        <div className="text-sm font-bold text-center">Log Out</div>
      </button>
    </form>
  );
}
