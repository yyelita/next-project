import { db } from "@/app/db/mongo";
import { NextResponse } from "next/server";

const collection = db.collection("products");

export async function GET() {
  try {
    const products = await collection.find({}).toArray();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching products", error },
      { status: 500 }
    );
  }
}
