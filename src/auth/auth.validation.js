import { z } from "zod";

export const registerSchema = z.object({
  name: z.string()
    .trim()
    .min(1, "Name can't be empty")
    .max(100, "Name can't be more than 100 characters"),

  email: z.string()
    .trim()
    .min(1, "Email can't be empty")
    .email("Invalid email"),

  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password can't be more than 100 characters"),
});

export const loginSchema = z.object({
  email: z.string()
    .trim()
    .email("Invalid email"),

  password: z.string()
    .min(1, "Password can't be empty")
    .max(100, "Password can't be more than 100 characters"),
});