import { z } from "zod"

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const RegisterFormSchema = z.object({
  email: z.string().email("Must be a valid email"),
  username: z.string().min(4, "Username must be at least 4 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirm: z.string().min(8, "Password must be at least 8 characters"),
})
