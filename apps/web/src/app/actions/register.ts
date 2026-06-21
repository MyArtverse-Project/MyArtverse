"use server"
import { RegisterFormSchema } from "@/app/lib/definition"
import { logError } from "@/utils"
import { getServerApiUrl } from "@/utils/apiUrl"
import { removeSuffixes } from "@/utils/removeSuffix"

export async function registerAction(formData: FormData) {
  const processedData = removeSuffixes(formData)
  const { email, username, password, confirm } = processedData

  const validatedFields = RegisterFormSchema.safeParse({
    email,
    password,
    username,
    confirm
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: {
        error: null,
        email: validatedFields.error.flatten().fieldErrors?.email,
        password: validatedFields.error.flatten().fieldErrors?.password,
        username: validatedFields.error.flatten().fieldErrors?.username,
        confirm: validatedFields.error.flatten().fieldErrors?.confirm
      }
    }
  }

  if (password !== confirm) {
    return {
      success: false,
      message: {
        username: null,
        email: null,
        error: "Passwords do not match",
        confirm: ["Passwords do not match"]
      }
    }
  }

  try {
    const res = await fetch(`${getServerApiUrl()}/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, username })
    })

    const data = await res.json()
    if (res.status === 400) {
      return {
        success: false,
        message: {
          email: data.email || null,
          username: data.username || null
        }
      }
    }

    if (res.ok) {
      return { success: true, message: data.message }
    }

    return {
      success: false,
      message: {
        error: "Something went wrong. Please try again later."
      }
    }
  } catch (error) {
    logError("registerAction", error)

    return {
      success: false,
      message: {
        error: "Something went wrong in our end! Please try again later."
      }
    }
  }
}
