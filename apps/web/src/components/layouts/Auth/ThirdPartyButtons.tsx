import { Button } from "@/components/ui/button"
import { FaFacebook, FaGoogle } from "react-icons/fa"

const providers = [
  { icon: FaGoogle, label: "Google" },
  // TODO: Uncomment when X and TikTok is available
  // { icon: RiTwitterXFill, label: "X" },
  // { icon: FaTiktok, label: "TikTok" },
  { icon: FaFacebook, label: "Facebook" }
]

export default function AuthThirdPartyProviders() {
  return (
    <div className="w-full space-y-2">
      {providers.map(({ icon: Icon, label }, index) => (
        <Button
          key={index}
          variant="secondary"
          className="w-full gap-2"
          asChild
        >
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL}/v1/auth/${label.toLowerCase()}/link`}
          >
            <Icon size={21} />
            {`Continue with ${label}`}
          </a>
        </Button>
      ))}
    </div>
  )
}
