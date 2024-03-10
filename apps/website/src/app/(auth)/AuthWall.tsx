import Link from "next/link"
import { MyFursonaIcon } from "@/components/icons"

export default function AuthWall({
  children,
  heading
}: {
  children?: React.ReactNode
  heading?: string
}) {
  return (
    <main
      className="grid h-[100dvh] place-items-center bg-gradient-to-tr 
      from-purple-500 via-violet-400 to-violet-700 px-8
    "
    >
      <div className="bg-100 relative flex w-full max-w-xl flex-col items-center gap-y-2.5 overflow-hidden rounded-xl px-8 py-6">
        <div className="mb-6 mt-2 flex flex-col items-center">
          <Link href="/">
            <MyFursonaIcon logoOnly size={1.125} />
          </Link>
          <h1 className="my-5 text-3xl">{heading}</h1>
        </div>
        {children}
      </div>
    </main>
  )
}
