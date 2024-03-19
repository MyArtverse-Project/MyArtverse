"use client"

import { useRouter } from "next/navigation"
import { type FormEvent, useRef, useState } from "react"
import { Hyperlink, Separator } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { InputField } from "@/components/ui/Forms"
import { emailRegex } from "@/constants"
import { BACKEND_URL as endpoint } from "@/utils/env"
import { BRAND } from "@myfursona-internal/config"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { LuChevronLeft, LuLogIn } from "react-icons/lu"
import type { MapElement } from "@/types/utils"
import AuthThirdPartyProviders from "../AuthThirdPartyProviders"

export default function LoginForm() {
  const router = useRouter()

  const [isValidEmail, setValidEmail] = useState(false)
  const [formData, setFormData] = useState<{
    email: string
    emailErrorMsg?: string
    password: string
    passwordErrorMsg?: string
  }>({
    email: "",
    emailErrorMsg: null,
    password: "",
    passwordErrorMsg: null
  })

  const clearEmailError = () => {
    setFormData((prevValue) => ({ ...prevValue, emailErrorMsg: null }))
  }

  const handleInputChange = (e: React.ChangeEvent<MapElement<"input">>) => {
    const { name, value } = e.currentTarget

    if (formData.emailErrorMsg) clearEmailError()

    setFormData((prevValue) => ({ ...prevValue, [name]: value }))
  }

  const validateEmail = () => {
    const { email } = formData

    if (!email) {
      setFormData((prevValue) => ({
        ...prevValue,
        emailErrorMsg: "This field cannot be blank"
      }))
      return
    }

    if (emailRegex.exec(email)?.length !== 1) {
      setFormData((prevValue) => ({ ...prevValue, emailErrorMsg: "Invalid email!" }))
      return
    }

    clearEmailError()
    setValidEmail(true)
    return
  }

  const passwordFieldRef = useRef<React.ElementRef<"input">>(null)

  const submitLogin = async (e: FormEvent<MapElement<"form">>) => {
    e.preventDefault()

    const requestOptions: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: formData.email, password: formData.password })
    }

    await fetch(`${endpoint}/v1/auth/login`, requestOptions).then((res) => {
      const jsonResponse = res.json()

      if (res.ok) {
        return jsonResponse.then(() => {
          // TODO: Redirect to user's profile
          router.push(`/`)
        })
      }

      return jsonResponse
        .then((data) => {
          switch (res.status) {
            case 400:
              // Invalid Login
              if (data.email) setValidEmail(false)
              setFormData((prevValue) => ({
                ...prevValue,
                passwordErrorMsg: data.password
              }))
              break
            case 401:
              // Unauthorized -- Must need to be verified
              setFormData((prevValue) => ({ ...prevValue, emailErrorMsg: data.email }))
              setValidEmail(false)
              break
          }
        })
        .catch((e) => console.error(e))
    })
  }

  const handleClearFormOnTransitionEnd = () => {
    if (!isValidEmail) {
      setFormData((prevValue) => ({
        ...prevValue,
        email: "",
        password: ""
      }))

      passwordFieldRef.current.value = ""
    }
  }

  const allRequiredFields = {
    required: true,
    noLabel: true,
    onChange: handleInputChange
  }

  const fmDelay = 0.15
  const fmRelativeTransform = 25
  const fmTransition = {
    ease: "easeInOut",
    duration: 0.17
  }

  return (
    <>
      <div className="w-full">
        <div className="mb-2">Login with</div>
        <div className="flex gap-1">
          <AuthThirdPartyProviders />
        </div>
      </div>
      <div className="my-3 w-full">
        <Separator dir="horizontal" padding="0.15rem" />
      </div>
      <div className="w-full">
        <form onSubmit={submitLogin}>
          <LazyMotion features={domAnimation}>
            <m.div
              className="relative"
              animate={{ marginBottom: !isValidEmail ? "0rem" : "2.5rem" }}
            >
              {/* Email field */}
              <m.div
                animate={{
                  x: !isValidEmail ? "0%" : `-${fmRelativeTransform}%`,
                  opacity: !isValidEmail ? 100 : 0,
                  pointerEvents: !isValidEmail ? "auto" : "none"
                }}
                transition={{
                  delay: !isValidEmail ? fmDelay : 0,
                  ...fmTransition
                }}
              >
                <InputField
                  {...allRequiredFields}
                  type="email"
                  inputName="Email"
                  placeholder="Email"
                  error={formData.emailErrorMsg}
                  value={formData.email}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") validateEmail()
                  }}
                />
                <div className="mt-3 flex items-center justify-between">
                  <span
                    className="cursor-pointer text-blue-400 hover:text-blue-500 hover:underline"
                    role="link"
                  >
                    Sign-in options
                  </span>
                  <Button type="button" onClick={validateEmail}>
                    Next
                  </Button>
                </div>
              </m.div>
              {/* Password field */}
              <m.div
                initial={{
                  x: `${fmRelativeTransform}%`,
                  opacity: 0
                }}
                animate={{
                  x: !isValidEmail ? `${fmRelativeTransform}%` : "0%",
                  opacity: !isValidEmail ? 0 : 100,
                  pointerEvents: !isValidEmail ? "none" : "auto"
                }}
                transition={{
                  delay: !isValidEmail ? 0 : fmDelay,
                  ...fmTransition
                }}
                onTransitionEnd={handleClearFormOnTransitionEnd}
                className="absolute inset-x-0 top-0"
              >
                <div className="mb-1.5 flex items-center gap-x-1">
                  <Button
                    variant="tritery"
                    icon={<LuChevronLeft size={19} />}
                    onClick={() => setValidEmail(false)}
                    className="p-1"
                  />
                  <span className="select-none opacity-75">{formData.email}</span>
                </div>
                <InputField
                  ref={passwordFieldRef}
                  {...allRequiredFields}
                  type="password"
                  placeholder="Password"
                  inputName="Password"
                />
                <div className="mt-3 flex items-center justify-between">
                  <Hyperlink href="/forgot-password">Forgot password?</Hyperlink>
                  <Button type="submit" prefixIcon={<LuLogIn size={20} />}>
                    Login
                  </Button>
                </div>
              </m.div>
            </m.div>
          </LazyMotion>
        </form>
      </div>
      {/* Register link */}
      <div className="mt-3 flex justify-center">
        <span className="mr-2">{`New to ${BRAND}?`}</span>
        <Hyperlink href="/register">Create an account!</Hyperlink>
      </div>
    </>
  )
}
