"use server"

import { cookies } from "next/headers"
import { LoginFormSchema } from "@/app/lib/definition"
import { BACKEND_URL } from "@/utils/constants"
import { removeSuffixes } from "@/utils/removeSuffix"

export async function loginAction(formData: FormData) {
  const processedData = removeSuffixes(formData)
  const { email, password } = processedData

  const validatedFields = LoginFormSchema.safeParse({
    email,
    password
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: {
        error: "Invalid fields",
        email: validatedFields.error.flatten().fieldErrors?.email,
        password: validatedFields.error.flatten().fieldErrors?.password
      }
    }
  }

  try {
    const res = await fetch(`${BACKEND_URL}/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (res.ok) {
      ;(await cookies()).set("accessToken", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
      })
      ;(await cookies()).set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/"
      })

      return { success: true, message: data.message }
    }

    return {
      success: false,
      message: {
        error: data.error || "Invalid email or password"
      }
    }
  } catch (error) {
    return {
      success: false,
      message: {
        error: "Something went wrong. Please try again later."
      }
    }
  }
}
