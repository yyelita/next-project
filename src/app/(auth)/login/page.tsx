import Link from "next/link";

export default function Login() {
  return (
    <form className="p-8 bg-white w-[320px] rounded-md shadow-md flex flex-col gap-8">
      <h1 className="text-3xl">Login</h1>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <button className="w-full bg-blue-500 text-white rounded-md p-2 mt-4">
          Login
        </button>
      </div>

      <div>
        <Link href="/register" className="text-blue-500">
          Login
        </Link>
      </div>
    </form>
  );
}
