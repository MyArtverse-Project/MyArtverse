import Image from "next/image"
import Link from "next/link"
import React from "react"
import ThirdPartyButtons from "@/components/layouts/Auth/ThirdPartyButtons"
import { Button } from "@mav/ui/components/buttons"
import { InputField } from "@mav/ui/components/fields"

export default function Page() {
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
        <h1 className="text-700 z-10 text-2xl">Register a new account</h1>
        <ThirdPartyButtons />
        <p>or</p>
        <div className="flex w-2/3 flex-col gap-y-4">
          <InputField placeholder="Email" type="email" inputName="Email" />
          <InputField placeholder="Username" type="text" inputName="Username" />
          <span className="text-600 text-xs">
            Username must contain [A-Z][a-z][0-9], underscore, and periods.
          </span>
          <InputField
            placeholder="Password"
            type="password"
            inputName="Password"
          />
          <InputField
            placeholder="Repeat Password"
            type="password"
            inputName="Repeat Password"
          />
          <Button
            variant="primary"
            position="center"
            className="mt-4 w-full text-center"
          >
            <span className="w-max">Register</span>
          </Button>
        </div>
        <div className="flex flex-row gap-x-6">
          <Link href="/login" className="text-500 text-sm">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
