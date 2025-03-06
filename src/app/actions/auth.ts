"use server";
import bcrypt from "bcrypt";

import { redirect } from "next/navigation";
import z from "zod";
import User from "../models/User";

import { createSession, deleteSession } from "../lib/session";

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type FormResponse = {
  errors: {
    name: string[];
    email: string[];
    password: string[];
  };
};

export async function register(prevState: FormResponse, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = userSchema.safeParse({ name, email, password });

  if (!result.success) {
    return {
      errors: {
        name: result.error.flatten().fieldErrors.name ?? [], // ✅ Always an array
        email: result.error.flatten().fieldErrors.email ?? [],
        password: result.error.flatten().fieldErrors.password ?? [],
      },
    };
  }
  // const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ name, email, password });
  redirect("/login");
}

export async function login(
  prevState: { message: string },
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await User.findByEmail(email);

  if (!user) {
    return {
      message: "Invalid email or password",
    };
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    return {
      message: "Invalid email or password",
    };
  }

  await createSession(user);
  redirect("/");
}

export async function logout() {
  deleteSession();
  redirect("/");
}
