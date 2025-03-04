import { db } from "@/app/db/mongo";

interface UserType {
  email: string;
  password: string;
}

const collection = db.collection("users");
class User {
  static async create({ email, password }: UserType) {
    const result = await collection.insertOne({ email, password });
    const newUser = await collection.findOne({ _id: result.insertedId });
    console.log(newUser);
    return newUser;
  }
}

export default User;
