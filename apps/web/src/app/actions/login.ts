"use server";

import { type FormState, LoginFormSchema } from "@/app/lib/definition";
import { removeSuffixes } from "@/utils/removeSuffix";

export async function loginAction(formData: FormData) {
  const processedData = removeSuffixes(formData)
  const { email, password } = processedData

  const validatedFields = LoginFormSchema.safeParse({
    email,
    password,
  })
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields",
    }
  }

  const res = await fetch("http://localhost:8081/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    throw new Error("Login failed")
  }

  const data = await res.json()
  return data
}