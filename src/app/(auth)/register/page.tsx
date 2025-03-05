"use client";
import { register } from "@/app/actions/auth";
import Link from "next/link";
import { useActionState, useState } from "react";

const initialState = {
  errors: {
    name: [],
    email: [],
    password: [],
  },
};

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [state, formAction, pending] = useActionState(register, initialState);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        action={formAction}
        className="bg-white w-[350px] p-6 rounded-lg shadow-lg flex flex-col gap-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h1>

        {/* Name Input */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 font-medium">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            name="name"
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
          {state.errors.name?.length > 0 && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.name.join(", ")}
            </p>
          )}
        </div>

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
          {state.errors.email?.length > 0 && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.email.join(", ")}
            </p>
          )}
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
          {state.errors.password?.length > 0 && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.password.join(", ")}
            </p>
          )}
        </div>

        {/* Register Button */}
        <button
          disabled={pending}
          className="w-full bg-emerald-600 text-white rounded-md py-2 font-semibold hover:bg-emerald-800 transition"
        >
          {pending ? "Saving data..." : "Register"}
        </button>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-emerald-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
