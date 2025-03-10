"use server"

import { type FormState, LoginFormSchema } from "@/app/lib/definition"

export async function loginAction(formData: FormData) {
  console.log("Starting login action")
  console.log("Form data:", formData)
  const email = formData.get("email")
  const password = formData.get("password")
  console.log("Email:", email)
  
  const validatedFields = LoginFormSchema.safeParse({
    email,
    password,
  })
  console.log("Validation result:", validatedFields.success)

  if (!validatedFields.success) {
    console.log("Validation failed:", validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields",
    }
  }

  console.log("Making login request to API")
  const res = await fetch("http://localhost:8081/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    console.error("Login request failed with status:", res.status)
    throw new Error("Login failed")
  }

  const data = await res.json()
  console.log("Login successful")
  return data
}
