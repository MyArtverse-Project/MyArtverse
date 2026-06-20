"use client"

import { useAuth } from "@/app/context/AuthContext"
import Image from "next/image"
import { useEffect, useRef } from "react"

export default function LogoutPage() {
  const { logout, isLoading } = useAuth()
  const hasStarted = useRef(false)

  useEffect(() => {
    if (isLoading || hasStarted.current) return

    hasStarted.current = true
    void logout()
  }, [isLoading, logout])

  return (
    <div className="bg-background relative flex min-h-screen w-full items-start justify-center px-6 pt-36">
      <Image
        src="/Backdrop.png"
        alt="Backdrop"
        height={250}
        width={2000}
        className="absolute left-0 top-0 z-0 h-1/4 w-full object-cover"
      />
      <div className="bg-card text-card-foreground border-border relative z-10 flex w-full max-w-2xl flex-col items-center justify-center gap-y-4 rounded-lg border p-12 shadow-md">
        <h1 className="text-2xl font-semibold">Signing out</h1>
        <p className="text-muted-foreground text-sm">
          You will be redirected to the sign-in page shortly.
        </p>
      </div>
    </div>
  )
}
