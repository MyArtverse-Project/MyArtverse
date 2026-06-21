"use client"

import { recoverAction } from "@/app/actions/recover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RecoverForm({ uuid }: { uuid: string }) {
  const router = useRouter()
  const [message, setMessage] = useState<string>()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const res = await recoverAction(formData, uuid)

    if (res.success) {
      router.push(`/login`)
    } else {
      setMessage(
        res.message.error || "Something went wrong. Please try again."
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4">
      {message && <p className="text-destructive text-center">{message}</p>}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm">Confirm Password</Label>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          placeholder="Confirm Password"
        />
      </div>
      <Button type="submit" className="mt-4 w-full">
        Reset Password
      </Button>
    </form>
  )
}
