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

// ** Create Post ** //
export const CreatePostValidation = z.object({
  caption: z.string().min(3),
  file: z.custom<File[]>((files) => {
    if (files.length === 0) {
      throw new Error("Please select at least one file");
    }
    return files;
  }),
  location: z
    .string()
    .min(1, { message: "Location must be at least 1 character long" })
    .max(100, { message: "Location must be at most 100 characters long" }),
  tags: z.string().min(3),
});
