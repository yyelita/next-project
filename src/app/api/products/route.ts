import { db } from "@/app/db/mongo";
import { NextRequest, NextResponse } from "next/server";

const collection = db.collection("products");

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const search = params.get("query");

    if (search !== null) {
      const products = await collection
        .find({
          title: { $regex: search, $options: "i" },
        })
        .toArray();
      return NextResponse.json(products, { status: 200 });
    }

    const products = await collection.find({}).toArray();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error },
      { status: 500 }
    );
  }
}
