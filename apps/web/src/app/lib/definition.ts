import { z } from "zod"

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const RegisterFormSchema = z.object({
  email: z.string().email("Must be a valid email"),
  username: z
    .string()
    .transform((value) => value.trim().replace(/^@+/, "").toLowerCase())
    .pipe(
      z
        .string()
        .min(4, "Username must be at least 4 characters")
        .regex(
          /^[a-z0-9_.]+$/,
          "Username must contain only letters, numbers, underscores, and periods."
        )
    ),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm: z.string().min(8, "Password must be at least 8 characters")
})

export const ForgotFormSchema = z.object({
  email: z.string().email("Must be a valid email")
})

export const RecoverFormSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm: z.string().min(8, "Password must be at least 8 characters")
})
