import { getServerApiUrl } from "@/utils/apiUrl"
import { logError } from "@/utils"
import Image from "next/image"
import { redirect } from "next/navigation"
import { LuXOctagon } from "react-icons/lu"

async function verifyEmail(id: string): Promise<boolean> {
  try {
    const res = await fetch(`${getServerApiUrl()}/v1/auth/verify/${id}`, {
      method: "POST",
      credentials: "include"
    })

    if (!res.ok) {
      logError(`POST /v1/auth/verify/${id}`, {
        status: res.status,
        statusText: res.statusText
      })
      return false
    }

    const data = await res.json()
    return data
  } catch (error) {
    logError(`POST /v1/auth/verify/${id}`, error)
    return false
  }
}

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const isVerified = await verifyEmail(id)

  if (isVerified) {
    redirect("/login")
  }

  return (
    <div className="bg-background relative flex min-h-screen w-full items-start justify-center px-6 pt-36">
      <Image
        src="/Backdrop.png"
        alt="Backdrop"
        height={250}
        width={2000}
        className="absolute left-0 top-0 z-0 h-1/4 w-full object-cover"
      />
      <div className="bg-card border-border relative z-10 flex w-full max-w-2xl flex-col items-center justify-center gap-y-6 rounded-lg border-2 p-12 shadow-md">
        <LuXOctagon size={45} />
        <h1 className="text-2xl font-semibold">Unable to verify account</h1>
        <p>There was an issue verifying your email. Please try again later.</p>
      </div>
    </div>
  )
}
