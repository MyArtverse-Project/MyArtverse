import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Home() {
  const cookieStore = await cookies()
  const isLoggedIn =
    cookieStore.has("accessToken") || cookieStore.has("refreshToken")

  if (isLoggedIn) {
    redirect("/browse")
  }

  return (
    <section className="flex min-h-[min(70vh,36rem)] items-center justify-center px-6 py-20">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Where everyone belongs
        </h1>

        <p className="text-foreground text-lg leading-relaxed sm:text-xl md:text-2xl">
          MyArtverse is an open source platform that allows users to track their
          characters, commissions, and adoptable reference sheets!
        </p>
      </div>
    </section>
  )
}
