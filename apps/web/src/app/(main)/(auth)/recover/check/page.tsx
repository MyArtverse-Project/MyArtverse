"use client"

import { useAuth } from "@/app/context/AuthContext"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { LuMail } from "react-icons/lu"

export default function Page() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (user && !isLoading) {
      router.push(`/`)
    }
  }, [user, isLoading, router])

  return (
    <div className="bg-background relative flex min-h-screen w-full items-start justify-center px-6 pt-36">
      <Image
        src="/Backdrop.png"
        alt="Backdrop"
        height={250}
        width={2000}
        className="absolute left-0 top-0 z-0 h-1/4 w-full object-cover"
      />
      <div className="bg-card text-card-foreground border-border relative z-10 flex w-full max-w-2xl flex-col items-center justify-center gap-y-6 rounded-lg border p-12 shadow-md">
        <LuMail size={45} />
        <h1 className="text-2xl font-semibold">Check your email!</h1>
        <p className="text-center">
          You should get an email with a link to recover your account. If you
          don't see it, check your spam folder.
        </p>
        <Button
          className="mt-4 w-full"
          onClick={() => router.push("/login")}
        >
          Sign in
        </Button>
      </div>
    </div>
  )
}
