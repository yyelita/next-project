"use server";

import { redirect } from "next/navigation";
import z from "zod";
import User from "../models/User";

export type FormResponse = {
  errors: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function register(prevState: FormResponse, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = userSchema.safeParse({ email, password });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  await User.create({ email, password });
  redirect("/login");
}
