import { BuiImage } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"

// TODO create a reusable component for displaying landing sections
export default function Landing() {
  return (
    <div className="flex flex-col lg:w-4/5 md:mt-8 md:flex-row items-center justify-between w-4/5 mx-auto my-20">
      <div className="md:w-1/2 flex flex-col gap-y-3 text-center md:text-left">
        <h1>A place where everyone belongs!</h1>
        <p className="text-lg">
          MyFursona is a platform that allows users to track their characters,
          commissions, and adoptable reference sheets!
        </p>
        <div className="mt-3 md:mt-0 flex flex-col-reverse gap-3 md:flex-row">
          <Button variant="secondary" href="/?show-as-guest=true">
            I'll look around
          </Button>
          <Button variant="primary" href="/register">
            Create an account
          </Button>
        </div>
      </div>
      <div className="md:w-[unset] w-1/2">
        <BuiImage
          height="27.5rem"
          aspectRatio="9/15"
          src="/img/hero/sona-render.png"
          sizes="(max-width: 1280px) 600px (max-width: 640px) 500px"
          strategy="important"
        />
      </div>
    </div>
  )
}
