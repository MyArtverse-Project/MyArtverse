import { Button } from "@/components/ui"
import { pageMeta } from "@/utils"

export const metadata = pageMeta({
  title: "Home - MyFursona",
  description:
    "MyFursona is a place to keep track of your fursonas, adopts, and commissions!"
})

export default function Home() {
  return (
    <div className="w-4/5 mx-auto my-20">
      <h1 className="text-5xl">A Place where everyone belongs!</h1>
      <p>Tincidunt praesent pellentesque auctor a a feugiat sed. Ultrices in cras commodo turpis luctus morbi.</p>
      <div className="flex flex-row mk-4 my-4">


        <Button variant="primary">I{"'"}ll look around</Button>
        <Button variant="primary">Sign Up</Button>
      </div>

    </div>
  )
}
