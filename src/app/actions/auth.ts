"use server";
import bcrypt from "bcrypt";

import { redirect } from "next/navigation";
import z from "zod";
import User from "../models/User";

// import { createSession, deleteSession } from "../lib/session";

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type FormResponse = {
  errors: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

export async function register(prevState: FormResponse, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = userSchema.safeParse({ email, password });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ email, password: hashedPassword });
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

  // await createSession(user);
  redirect("/");
}

export async function logout() {
  // deleteSession();
  redirect("/login");
}
