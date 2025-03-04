import { products } from "@/app/data/products";

export async function GET() {
  return Response.json(products, { status: 200 });
}

export async function POST(req: Request) {
  const data = await req.json();

  // todo: save data to db

  return Response.json(
    { message: "Data created", product: data },
    { status: 201 }
  );
}
