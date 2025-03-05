import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white w-[350px] p-6 rounded-lg shadow-lg flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h1>

        {/* Email Input */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email
          </label>
          <input
            type="email"
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
            type="password"
            id="password"
            name="password"
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
          />
        </div>

        {/* Login Button */}
        <button className="w-full bg-emerald-600 text-white rounded-md py-2 font-semibold hover:bg-emerald-800 transition">
          Login
        </button>

        {/* Register Link */}
        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-emerald-600 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
