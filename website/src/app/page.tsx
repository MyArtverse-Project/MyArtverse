import { Button } from "@/components/ui/Buttons"
import { pageMeta } from "@/utils"
import Image from "next/image"

export const metadata = pageMeta({
  title: "Home - MyFursona",
  description:
    "MyFursona is a place to keep track of your fursonas, adopts, and commissions!"
})

export default function Home() {
  return (
    <div className="w-4/5 mx-auto my-20 flex flex-row justify-between items-center ">
      <div>

        <h1 className="text-5xl">A place where everyone belongs!</h1>
        <p>
          Tincidunt praesent pellentesque auctor a a feugiat sed. Ultrices in cras
          commodo turpis luctus morbi.
        </p>
        <div className="flex flex-row my-4">
          <Button variant="secondary" className="mr-4 bg-transparent border-2 border-color-3 hover:bg-color-3 px-4 py-2  ">I{"'"}ll look around</Button>
          <Button variant="primary" className="mr-4 bg-color-3 hover:bg-dropdowns-text-field hover:bg-color-4 px-4 py-2  ">Sign Up</Button>
        </div>
      </div>
      <Image src="/img/hero/sona-render.png" alt="" width={300} height={500} />
    </div>
  )
}
