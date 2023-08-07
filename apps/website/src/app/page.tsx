import { Button } from "@/components/ui/Buttons"
import Notice from "@/components/ui/Note"
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
        <Notice type="error">error</Notice>
        <Notice type="warning">warnin</Notice>
        <Notice type="success" heading="success modal">
          <p>paragraph</p>
        </Notice>
      </div>
    </>
  )
}
