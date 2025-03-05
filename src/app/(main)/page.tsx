import Link from "next/link";

interface IProducts {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export default async function Products() {
  const response = await fetch("https://fakestoreapi.com/products");

  const products: IProducts[] = await response.json();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Featured Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
          >
            <Link href={`/products/${product.id}`}>
              <img
                className="w-full h-56 object-contain p-4"
                src={product.image}
                alt={product.title}
              />
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {/* {product.title} */}
              </h2>
              <p className="text-gray-600 text-sm line-clamp-2">
                {product.description}
              </p>
              <p className="text-xl font-bold text-emerald-600 mt-2">
                ${product.price}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-gray-500">
                  ⭐ {product.rating.rate} ({product.rating.count} reviews)
                </span>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-emerald-800 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
