"use client"

import { useRouter } from "next/navigation"
import { type FormEvent, useState } from "react"
import { Hyperlink } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { InputField } from "@/components/ui/Forms"
import Separator from "@/components/ui/Separator"
import { BACKEND_URL as endpoint } from "@/utils/env"
import type { FormFieldWithErrors, MapElement } from "@/types/utils"
import AuthThirdPartyProviders from "../AuthThirdPartyProviders"

export default function RegisterForm() {
  // TODO: Switch to using actions instead of event form after MVP
  const router = useRouter()

  const [registerFormData, setRegisterFormData] = useState<
    FormFieldWithErrors<{
      username: string
      email: string
      password: string
      confirmPassword: string
    }>
  >({
    username: "",
    usernameErrorMsg: null,
    email: "",
    emailErrorMsg: null,
    password: "",
    passwordErrorMsg: null,
    confirmPassword: "",
    confirmPasswordErrorMsg: null
  })

  const handleInputChange = (e: React.ChangeEvent<MapElement<"input">>) => {
    const { name, value } = e.target

    setRegisterFormData((prevValue) => ({ ...prevValue, [name]: value }))
  }

  const submitRegister = async (e: FormEvent<MapElement<"form">>) => {
    e.preventDefault()

    const { email, username, password, confirmPassword } = registerFormData

    if (password !== confirmPassword) {
      setRegisterFormData((prevValue) => ({
        ...prevValue,
        passwordErrorMsg: "Password must match"
      }))
      return
    }

    fetch(`${endpoint}/v1/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, username, password })
    }).then((res) => {
      const jsonRes = res.json()

      if (res.ok) {
        return jsonRes.then((data) => router.push("/verify"))
      }

      return jsonRes.then((data) => {
        switch (res.status) {
          case 400:
            // Email/Username Taken
            setRegisterFormData((prevData) => ({
              ...prevData,
              username: data.username,
              email: data.email,
              password: data.password
            }))
            break
          case 401:
            break
        }
      })
    })
  }

  const requiredFields = {
    required: true,
    onChange: handleInputChange
  }

  return (
    <>
      <div className="flex w-full gap-3">
        <AuthThirdPartyProviders />
      </div>
      <div className="my-3 w-full">
        <Separator dir="horizontal" padding="0.15rem" />
      </div>
      <div className="relative w-full">
        <form onSubmit={submitRegister} className="flex flex-col justify-center gap-y-2">
          <InputField
            {...requiredFields}
            inputName="Username"
            type="text"
            value={registerFormData.username}
            error={registerFormData.usernameErrorMsg}
          />
          <InputField
            {...requiredFields}
            inputName="Email"
            type="email"
            value={registerFormData.email}
            error={registerFormData.emailErrorMsg}
          />
          <InputField
            {...requiredFields}
            inputName="Password"
            type="password"
            error={registerFormData.passwordErrorMsg}
          />
          <InputField
            required
            inputName="Confirm password"
            type="password"
            onChange={(e) =>
              setRegisterFormData((prevValue) => ({
                ...prevValue,
                confirmPassword: e.target.value
              }))
            }
            error={registerFormData.passwordErrorMsg}
          />
          <Button type="submit" className="mx-auto">
            Register
          </Button>
        </form>
        <div className="mt-6 text-center">
          {"Already have an account? "}
          <Hyperlink href="/login">Sign in</Hyperlink>
        </div>
        <div id="accept-tos-msg">
          By creating an account, you adhere to the Community Guidelines and Terms of
          Service
        </div>
      </div>
    </>
  )
}
