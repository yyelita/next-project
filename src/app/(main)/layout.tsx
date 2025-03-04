export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="bg-green-500  h-12 text-xl px-7 py-2 flex justify-between">
        <h1 className="text-white items-start font-arial font-bold cursor-pointer">
          HacktivStore
        </h1>
        <input
          className="rounded-full flex w-1/2 sm:text-sm px-3"
          placeholder="search product.."
        />
        <div>
          <button className="border border-white rounded-full py-1 px-3 cursor-pointer text-white mx-1.5">
            <div className="text-sm text-center">Cart</div>
          </button>
          <button className="border bg-green-600 border-white rounded-full py-1 px-3 cursor-pointer text-white">
            <div className="text-sm font-bold text-center">Log Out</div>
          </button>
        </div>
      </header>
      {children}
    </>
  );
}
