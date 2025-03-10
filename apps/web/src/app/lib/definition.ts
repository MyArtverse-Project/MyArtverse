import { z } from "zod"

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export type FormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
