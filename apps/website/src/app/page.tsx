import { Metadata } from "next"

import { Button } from "@/components/ui/Buttons"
import { BuiImage } from "@/components/ui"

const title = "MyFursona — a place where everyfur belongs!"
const description =
  "MyFursona is a social platform where you manage and keep track of your fursonas, art commissions, trades, and character adoptables!"

export const metadata: Metadata = {
  title: {
    absolute: title
  },
  description: description,
  openGraph: {
    title: title,
    description: description
  }
}

export default function Home() {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-4/5 mx-auto my-20 ">
        <div className="flex flex-col gap-y-3">
          <h1>A place where everyone belongs!</h1>
          <p className="text-lg">
            MyFursona is a platform that allows users to track their characters,
            commissions, and adoptable reference sheets!
          </p>
          <div className="flex flex-row gap-x-4">
            <Button variant="secondary" href="/?showdatshit">
              I'll look around
            </Button>
            <Button variant="primary" href="/register">
              Sign Up
            </Button>
          </div>
        </div>
        <BuiImage
          height="27.5rem"
          aspectRatio="9/15"
          src="/img/hero/sona-render.png"
          sizes="(max-width: 1280px) 600px (max-width: 640px) 500px"
          strategy="important"
        />
      </div>
    </>
  )
}
