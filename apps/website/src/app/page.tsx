import { Button } from "@/components/ui/Buttons"
import Notice from "@/components/ui/Note"
import { pageMeta } from "@/utils"
import Image from "next/image"

export const metadata = pageMeta({
  title: "Home - MyFursona",
  description:
    "MyFursona is a place to keep track of your fursonas, adopts, and commissions!"
})

export default function Home() {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-4/5 mx-auto my-20 ">
        <div>
          <h1 className="text-5xl">A place where everyone belongs!</h1>
          <p>
            Tincidunt praesent pellentesque auctor a a feugiat sed. Ultrices in
            cras commodo turpis luctus morbi.
          </p>
          <div className="flex flex-row gap-x-4">
            <Button variant="secondary">I'll look around</Button>
            <Button variant="primary">Sign Up</Button>
          </div>
        </div>
        <Image
          src="/img/hero/sona-render.png"
          alt=""
          width={300}
          height={500}
        />
      </div>
      <div>
        <Notice type="error">You alerted the horde</Notice>
        <Notice type="warning">You startled the witch</Notice>
        <Notice type="success" heading="Hey bitch">
          <p>No you didn't lol</p>
        </Notice>
      </div>
    </>
  )
}
