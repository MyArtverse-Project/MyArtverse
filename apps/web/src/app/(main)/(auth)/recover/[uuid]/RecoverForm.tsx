"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { recoverAction } from "@/app/actions/recover"
import { Button } from "@mav/ui/components/buttons"
import { Form, type FormState, InputField } from "@mav/ui/components/fields"

export default function RecoverForm({ uuid }: { uuid: string }) {
  const router = useRouter()
  const [errors, setErrors] = useState<FormState>()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const res = await recoverAction(formData, uuid)

    if (res.success) {
      router.push(`/login`)
    } else {
      setErrors({
        message: res.message.error || "Something went wrong. Please try again.",
        errors: {},
      })
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4">
      {errors && <p className="text-center text-red-500">{errors.message}</p>}
      <InputField
        type="password"
        inputName="Password"
        placeholder="Password"
        error={errors?.errors.password}
      />
      <InputField
        type="password"
        inputName="Confirm"
        placeholder="Confirm Password"
        error={errors?.errors.confirm}
      />
      <Button position="center" type="submit" className="mt-4 w-full text-center">
        Reset Password
      </Button>
    </Form>
  )
}
