"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { loginAction } from "@/app/actions/login"
import { useAuth } from "@/app/context/AuthContext"
import ThirdPartyButtons from "@/components/layouts/Auth/ThirdPartyButtons"
import { Button } from "@mav/ui/components/buttons"
import { Form, type FormState, InputField } from "@mav/ui/components/fields"

export default function Page() {
  const router = useRouter()

  const [errors, setErrors] = useState<FormState>()
  const { user, isLoading } = useAuth()
  if (user && !isLoading) router.push(`/`)

  // TODO: Figure out how to handle this in the action file
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const res = await loginAction(formData)

    if (res.success) {
      router.push(`/`)
    } else {
      setErrors({
        message: res.message.error || "Something went wrong. Please try again.",
        errors: {
          email: res.message.email ?? [],
          password: res.message.password ?? [],
        },
      })
    }
  }

  return (
    <div className="bg-100 relative mx-auto flex h-1/2 w-screen flex-col items-center gap-y-6 py-12">
      <Image
        src="/Backdrop.png"
        alt="Backdrop"
        height={250}
        width={2000}
        className="z-0 h-1/4"
      />
      <div className="bg-100 border-200 absolute z-10 flex w-1/2 flex-col items-center justify-center gap-y-6 rounded-lg border-2 p-12 shadow-md">
        <h1 className="text-700 z-10 text-2xl">Sign in to MyArtverse</h1>
        <ThirdPartyButtons />
        <span>or</span>
        <Form onSubmit={handleSubmit} className="flex w-2/3 flex-col gap-y-4">
          {errors && <p className="text-red-500">{errors.message}</p>}
          <InputField
            type="email"
            inputName="Email"
            placeholder="Email"
            error={errors?.errors?.email?.[0]}
          />
          <div className="space-y-2">
            <InputField
              inputName="Password"
              type="password"
              placeholder="Password"
              error={errors?.errors?.password?.[0]}
            />
            <Link
              href="/forgot-password"
              className="text-500 inline-block text-sm underline hover:no-underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="mt-4 w-full text-center">
            <span className="w-max">Sign in</span>
          </Button>
        </Form>
        <div className="flex flex-row gap-x-6">
          <Link href="/register" className="text-500 text-sm">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}
