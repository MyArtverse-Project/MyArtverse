import { Button } from "@/components/ui/Buttons"
import Notice from "@/components/ui/Notice"
import { Metadata } from "next"
import Image from "next/image"

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
        <div>
          <h1 className="text-5xl">A place where everyone belongs!</h1>
          <p>
            MyFursona is an open-source platform where you dump your mom lol
          </p>
          <div className="flex flex-row gap-x-4">
            <Button variant="secondary" href="/?showdatshit">
              I'll look around
            </Button>
            <Button variant="primary" href="/signup">
              Sign Up
            </Button>
          </div>
        </div>
        {/* TODO refactor this as its own <Image/> component */}
        <div
          data-custom-img-renderer=""
          className="relative h-[27.5rem] before:absolute before:-inset-4 before:z-[2]"
          style={{ aspectRatio: "9/15" } as React.CSSProperties}
          draggable="false"
        >
          <Image
            className="select-none"
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
      <div>
        <Notice type="error">error</Notice>
        <Notice type="warning">warnin</Notice>
        <Notice type="success" heading="success modal">
          <p>paragraph</p>
        </Notice>
      </div>
    </>
  )
}
