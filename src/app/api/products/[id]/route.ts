import { db } from "@/app/db/mongo";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const collection = db.collection("products");
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Convert id to ObjectId since MongoDB uses it
    const product = await collection.findOne({ _id: new ObjectId(params.id) });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const data = await req.json();

    if (
      !data.quantity ||
      typeof data.quantity !== "number" ||
      data.quantity <= 0
    ) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    const objectId = new ObjectId(id);
    const product = await collection.findOne({ _id: objectId });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.quantity < data.quantity) {
      return NextResponse.json(
        { error: "Not enough stock available" },
        { status: 400 }
      );
    }

    const updatedProduct = await collection.findOneAndUpdate(
      { _id: objectId },
      { $inc: { quantity: -data.quantity } },
      { returnDocument: "after" }
    );

    if (!updatedProduct || !updatedProduct.value) {
      return NextResponse.json(
        { error: "Failed to update product" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: `Quantity updated for product ${id}`,
        product: updatedProduct.value, // Safe access
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error updating quantity:", error);

    return NextResponse.json(
      {
        message: "Error updating quantity",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
