"use client"

import { forgotAction } from "@/app/actions/recover"
import { useAuth } from "@/app/context/AuthContext"
import { Button } from "@mav/ui/components/buttons"
import { Form, type FormState, InputField } from "@mav/ui/components/fields"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { LuKeyRound } from "react-icons/lu"

export default function Page() {
  const router = useRouter()

  const [errors, setErrors] = useState<FormState>()
  const { user, isLoading } = useAuth()

  // TODO: Figure out how to handle this in the action file
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const res = await forgotAction(formData)

    if (res.success) {
      router.push(`/recover/check`)
    } else {
      setErrors({
        message: res.message.error || "Something went wrong. Please try again.",
        errors: {}
      })
    }
  }

  useEffect(() => {
    if (user && !isLoading) {
      router.push(`/`)
    }
  }, [user, isLoading, router])

  return (
    <div className="bg-100 relative flex min-h-screen w-full items-start justify-center px-6 pt-36">
      <Image
        src="/Backdrop.png"
        alt="Backdrop"
        height={250}
        width={2000}
        className="absolute left-0 top-0 z-0 h-1/4 w-full object-cover"
      />
      <div className="bg-100 border-200 relative z-10 flex w-full max-w-2xl flex-col items-center justify-center gap-y-6 rounded-lg border-2 p-12 shadow-md">
        <LuKeyRound size={45} />
        <h1 className="text-700 text-2xl">Forgot Password</h1>
        <Form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4">
          {errors && (
            <p className="text-center text-red-500">{errors.message}</p>
          )}
          <InputField
            type="email"
            inputName="Email"
            placeholder="Email"
            error={errors?.errors.email}
          />
          <Button
            position="center"
            type="submit"
            className="mt-4 w-full text-center"
          >
            Continue
          </Button>
        </Form>
        <div className="flex flex-row items-center justify-center gap-x-6">
          <Link href="/register" className="text-600 text-sm">
            Create an account
          </Link>
          <Link href="/login" className="text-600 text-sm">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
