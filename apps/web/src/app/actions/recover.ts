"use server"
import { ForgotFormSchema, RecoverFormSchema } from "@/app/lib/definition"
import { logError } from "@/utils"
import { getServerApiUrl } from "@/utils/apiUrl"
import { removeSuffixes } from "@/utils/removeSuffix"

export async function forgotAction(formData: FormData) {
  const processedData = removeSuffixes(formData)
  const { email } = processedData

  const validatedFields = ForgotFormSchema.safeParse({
    email
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: {
        error: null,
        email: validatedFields.error.flatten().fieldErrors?.email
      }
    }
  }

  try {
    const res = await fetch(`${getServerApiUrl()}/v1/auth/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    })

    const data = await res.json()
    if (res.status === 400) {
      return {
        success: false,
        message: data
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
    logError("forgotAction", error)

    return {
      success: false,
      message: {
        error: "Something went wrong in our end! Please try again later."
      }
    }
  }
}

export async function recoverAction(formData: FormData, uuid: string) {
  const processedData = removeSuffixes(formData)
  const { password, confirm } = processedData

  const validatedFields = RecoverFormSchema.safeParse({
    password,
    confirm
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: {
        error: null,
        password: validatedFields.error.flatten().fieldErrors?.password,
        confirm: validatedFields.error.flatten().fieldErrors?.confirm
      }
    }
  }

  if (password !== confirm) {
    return {
      success: false,
      message: {
        error: null,
        password: ["Passwords do not match"]
      }
    }
  }

  try {
    const res = await fetch(`${getServerApiUrl()}/v1/auth/recover`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newPassword: password, uuid })
    })

    const data = await res.json()
    if (res.status === 400) {
      return {
        success: false,
        message: data
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
    logError("recoverAction", error)

    return {
      success: false,
      message: {
        error: "Something went wrong in our end! Please try again later."
      }
    }
  }
}
