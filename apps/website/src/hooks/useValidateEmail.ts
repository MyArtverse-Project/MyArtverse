import { emailRegex } from "@/constants"

export function useValidateEmail(email: string) {
  const emailMatch = emailRegex.exec(email)

  const validateDatShit = () => {
    if (!email) {
      return
    }

    if (!emailMatch) {
      throw new Error("Invalid email format")
    }

    if (emailMatch.length !== 1) {
      throw new Error("Invalid email format")
    }
  }

  return {
    validateDatShit
  }
}
