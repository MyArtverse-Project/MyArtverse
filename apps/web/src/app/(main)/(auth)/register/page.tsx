"use client"

import { registerAction } from "@/app/actions/register"
import { useAuth } from "@/app/context/AuthContext"
import ThirdPartyButtons from "@/components/layouts/Auth/ThirdPartyButtons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

interface FormState {
  message?: string
  errors: {
    email: string[]
    password: string[]
    username: string[]
    confirm: string[]
  }
}

export default function Page() {
  const router = useRouter()

  const [errors, setErrors] = useState<FormState>()
  const { user, isLoading } = useAuth()

  // TODO: Figure out how to handle this in the action file
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const res = await registerAction(formData)

    if (res.success) {
      router.push(`/verify`)
    } else {
      setErrors({
        message: res.message.error,
        errors: {
          email: res.message.email ?? [],
          password: res.message.password ?? [],
          username: res.message.username ?? [],
          confirm: res.message.confirm ?? []
        }
      })
    }
  }

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
        <h1 className="text-2xl font-semibold">Register a new account</h1>
        <ThirdPartyButtons />
        <span className="text-muted-foreground text-sm">or</span>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4">
          {errors?.message && (
            <p className="text-destructive text-center">{errors.message}</p>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="Email" />
            {errors?.errors?.email?.map((err) => (
              <p key={err} className="text-destructive text-sm">
                {err}
              </p>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              pattern="^[a-z0-9_.]+$"
              placeholder="Username"
            />
            <span className="text-muted-foreground text-sm">
              Username must contain [A-Z][a-z][0-9], underscore, and periods.
            </span>
            {errors?.errors?.username?.map((err) => (
              <p key={err} className="text-destructive text-sm">
                {err}
              </p>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
            />
            {errors?.errors?.password?.map((err) => (
              <p key={err} className="text-destructive text-sm">
                {err}
              </p>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm Password</Label>
            <Input
              id="confirm"
              name="confirm"
              type="password"
              placeholder="Confirm Password"
            />
            {errors?.errors?.confirm?.map((err) => (
              <p key={err} className="text-destructive text-sm">
                {err}
              </p>
            ))}
          </div>
          <Button type="submit" className="mt-4 w-full">
            Register
          </Button>
        </form>
        <div className="flex flex-row gap-x-6">
          <Link
            href="/login"
            className="text-muted-foreground text-sm hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
