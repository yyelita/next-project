import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // Use Prisma for DB operations

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch products from external API
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    // Insert products into the database
    for (const product of products) {
      await prisma.product.upsert({
        where: { id: product.id }, // Avoid duplicates
        update: {},
        create: {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
          rating: product.rating.rate,
          ratingCount: product.rating.count,
        },
      });
    }

    return NextResponse.json({ message: "Products saved successfully!" });
  } catch (error) {
    console.error("Error saving products:", error);
    return NextResponse.json(
      { error: "Failed to save products" },
      { status: 500 }
    );
  }
}
