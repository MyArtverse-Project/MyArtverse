import { cookies } from "next/headers"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { fetcher } from "@/app/lib/fetcher"
import { BACKEND_URL } from "@/utils/constants"
import { type User, useAuth } from "./AuthContext"

export const useAuthRedirect = (redirectTo: string = "/login") => {
  "use client"

  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [authUser, setAuthUser] = useState<User | null>(null)

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(redirectTo)
      } else {
        setAuthUser(user)
      }
    }
  }, [user, isLoading, router, redirectTo])

  return { user: authUser, isLoading }
}

export const serverAuthRedirect = async () => {
  "use server"

  const token = (await cookies()).get("accessToken")?.value || null
  if (!token) {
    redirect("/login")
  }

  try {
    const user = await fetcher<User>(`${BACKEND_URL}/v1/auth/whoami`)
    return user
  } catch (error) {
    redirect("/login")
  }
}
