import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    quantity: Number,
    rating: {
      rate: Number,
      count: Number,
    },
  },
  { collection: "products" } // 👈 Forces Mongoose to use "products"
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
