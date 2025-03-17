import { Button } from "@mav/ui/components/buttons"
import { FaApple, FaFacebook, FaGoogle, FaTiktok } from "react-icons/fa"
import { RiTwitterXFill } from "react-icons/ri"

const providers = [
  { icon: FaGoogle, label: "Google" },
  // TODO: Uncomment when X and TikTok is available
  // { icon: RiTwitterXFill, label: "X" },
  // { icon: FaTiktok, label: "TikTok" },
  { icon: FaFacebook, label: "Facebook" },
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
          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/${label.toLowerCase()}/link`} // Adjust the URL as needed
        >
          {`Continue with ${label}`}
        </Button>
      ))}
    </div>
  )
}
