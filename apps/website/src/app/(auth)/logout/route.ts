import { cookies } from "next/headers"

export async function GET() {
  cookies().delete("accessToken")
  cookies().delete("refreshToken")
  return new Response(null, {
    headers: { Location: "/" },
    status: 302
  })
}
