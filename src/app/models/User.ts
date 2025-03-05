import { db } from "@/app/db/mongo";
import bcrypt from "bcrypt";

export interface UserType {
  _id?: string;
  name: string;
  email: string;
  password: string;
}

const collection = db.collection<UserType>("users");
class User {
  static async create({ name, email, password }: UserType) {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const result = await collection.insertOne({
      name,
      email,
      password: hashedPassword,
    });

    const newUser = await collection.findOne({ _id: result.insertedId });
    console.log(newUser);
    return newUser;
  }

  static async findAll() {
    const users = await collection.find().toArray();
    return users;
  }

  static async findByEmail(email: string) {
    const user = await collection.findOne({ email });
    return user;
  }
}

export default User;
