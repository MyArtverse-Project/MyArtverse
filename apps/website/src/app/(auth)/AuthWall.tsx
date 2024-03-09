import { MyFursonaIcon } from "@/components/icons"

export default function AuthWall({
  children,
  heading
}: {
  children?: React.ReactNode
  heading?: string
}) {
  return (
    <main className="absolute inset-0 m-auto grid place-items-center px-8">
      <div className="relative flex w-full max-w-2xl flex-col items-center gap-y-2.5 overflow-hidden rounded-xl px-8 py-8">
        <div
          aria-hidden
          className="
            before:from-100 absolute inset-0 -z-[1] bg-gradient-to-bl  from-purple-500
          via-blue-600
          to-cyan-600 opacity-50 
            before:absolute before:inset-x-0 before:bottom-0 before:top-10 before:bg-gradient-to-t before:from-50%
          "
        />
        <div className="item-start mr-auto flex flex-col">
          <MyFursonaIcon size={0.75} />
          <h1 className="my-5 text-3xl">{heading}</h1>
        </div>
        {children}
      </div>
    </main>
  )
}
