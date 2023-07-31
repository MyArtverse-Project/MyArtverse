import Image from "next/image"

import { FacebookIcon, TwitterIcon, LogInIcon } from "lucide-react"
import { Button } from "@/components/ui/Buttons"
import { pageMeta } from "@/utils"

export const metadata = pageMeta({
  title: "Sign In - MyFursona",
  description:
    "MyFursona is a place to keep track of your fursonas, adopts, and commissions!"
})

export default function SignIn() {
  return (
    <div className="flex flex-col w-1/4 mx-auto my-16">
      <h2 className="my-4 text-3xl text-center">Sign In</h2>
      <Button
        variant={"primary"}
        className="w-full my-1 p-2 flex text-center justify-center items-center border border-[#9782FC] hover:bg-[#9782FC] ease-in-out transition-all"
        prefixIcon={<FacebookIcon />}
      >
        Login with Facebook
      </Button>
      <Button
        variant={"primary"}
        className="w-full my-1 p-2 flex text-center justify-center items-center border border-[#9782FC] hover:bg-[#9782FC] ease-in-out transition-all"
        prefixIcon={<TwitterIcon />}
      >
        Login with Twitter
      </Button>
      <hr className="my-5 border border-[#8B7CB5]"></hr>
      <form>
        <input
          type="text"
          className="w-full my-1 px-4 py-2 border border-[#9782FC] rounded-md"
          placeholder="Email"
        />
        <Button
          variant="primary"
          className="w-full bg-[#C5B8FE] my-2 p-2 flex text-center justify-center items-center"
        >
          <LogInIcon />
          Login
        </Button>
      </form>
    </div>
  )
}
