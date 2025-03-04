interface Products {
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
export default async function Home() {
  const response = await fetch("https://fakestoreapi.com/products");
  const products: Products[] = await response.json();

  return (
    <div className="p-8">
      <h1 className="text-3xl">Home</h1>
      <div className="flex flex-col gap-4">
        {products.map((post) => (
          <div key={post.id} className="bg-gray-100 p-4 border">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
