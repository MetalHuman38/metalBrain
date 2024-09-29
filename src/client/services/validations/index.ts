import * as z from "zod";

export const SignUpValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

// ** Create Admin ** //
export const CreateAdminValidation = z.object({
  new_admin: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  role: z.string(),
  created_at: z.date(),
  creator_role: z.string(),
});
