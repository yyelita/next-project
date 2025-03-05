import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

export const connectToDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    const conn = await mongoose.connect(MONGO_URI, {
      dbName: "next_project",
    });
    console.log(`✅ Connected to MongoDB: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};
//
//
