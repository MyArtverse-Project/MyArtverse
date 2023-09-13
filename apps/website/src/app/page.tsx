import { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/Buttons"

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
      <div className="flex flex-col  lg:w-3/5 md: mt-8 md:flex-row items-center justify-between w-4/5 mx-auto my-20">
        <div className="md:w-1/2 flex flex-col gap-y-3 lg:text-left md: text-center">
          <h1>A place where everyone belongs!</h1>
          <p className="text-lg">
            MyFursona is a platform that allows users to track their characters,
            commissions, and adoptable reference sheets!
          </p>
          <div className="sm: mt-5 sm: mx-20 flex flex-col lg:flex-row gap-x-4 sm: gap-y-4 lg:mt-4 lg:justify-start md:justify-center">
  <Button position="center" variant="secondary" href="/?showdatshit">
    I'll look around
  </Button>
  <Button position="center" variant="primary" href="/signup">
    Sign Up
  </Button>
</div>
        </div>
        <div className="md:w-1/2">
          {/* TODO refactor this as its own <Image/> component */}
          <div
            data-custom-img-renderer=""
            className="relative h-[27.5rem] before:absolute before:-inset-4 before:z-[2]"
            style={{ aspectRatio: "9/15" } as React.CSSProperties}
            draggable="false"
          >
            <Image
              className="select-none md: mt-4"
              src="/img/hero/sona-render.png"
              alt=""
              loading="eager"
              fetchPriority="high"
              fill
              sizes="(max-width: 1280px) 1000px (max-width: 640px) 500px"
              priority
            />
          </div>
        </div>
      </div>
    </>
  )
}