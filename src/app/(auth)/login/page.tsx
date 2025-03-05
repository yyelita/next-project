"use client";
import { login } from "@/app/actions/auth";
import Link from "next/link";
import { useActionState, useState } from "react";

const initialState = {
  message: "",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        action={formAction}
        className="bg-white w-[350px] p-6 rounded-lg shadow-lg flex flex-col gap-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

        {state.message && (
          <p className="text-red-500 text-center text-sm">{state.message}</p>
        )}

        {/* Email Input */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-gray-700 font-medium">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            name="password"
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>

        {/* Login Button */}
        <button
          disabled={pending}
          className="w-full bg-emerald-600 text-white rounded-md py-2 font-semibold hover:bg-emerald-800 transition"
        >
          {pending ? "Logging in..." : "Login"}
        </button>

        {/* Register Link */}
        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-emerald-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
