import Image from "next/image"
import { LuLock } from "react-icons/lu"
import RecoverForm from "./RecoverForm"

export default async function Page({
  params
}: {
  params: Promise<{ uuid: string }>
}) {
  const { uuid } = await params
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
        <LuLock size={45} />
        <h1 className="text-700 text-2xl">Recover Password</h1>
        <RecoverForm uuid={uuid} />
      </div>
    </div>
  )
}
