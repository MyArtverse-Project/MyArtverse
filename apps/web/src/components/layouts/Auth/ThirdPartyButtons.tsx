import { Button } from "@mav/ui/components/buttons"
import { FaApple, FaGoogle, FaTiktok } from "react-icons/fa"
import { RiTwitterXFill } from "react-icons/ri"

const providers = [
  { icon: FaGoogle, label: "Google" },
  { icon: RiTwitterXFill, label: "X" },
  { icon: FaTiktok, label: "TikTok" },
  { icon: FaApple, label: "Apple" },
]

export default function AuthThirdPartyProviders() {
  return (
    <div className="w-full space-y-2">
      {providers.map(({ icon: Icon, label }, index) => (
        <Button
          key={index}
          icon={<Icon size={21} />}
          variant="secondary"
          className="w-full"
          position="center"
        >
          {`Continue with ${label}`}
        </Button>
      ))}
    </div>
  )
}
