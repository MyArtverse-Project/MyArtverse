import { Google, Tiktok, XTwitter } from "@/components/icons"
import { Button } from "@/components/ui/Buttons"

const providers = [
  { icon: Google, platform: "Google" },
  { icon: XTwitter, platform: "X" },
  { icon: Tiktok, platform: "TikTok" }
]

export default function AuthThirdPartyProviders() {
  return (
    <>
      {providers.map(({ icon: Icon, platform }, index) => (
        <Button
          key={index}
          prefixIcon={<Icon size={21} />}
          variant="primary"
          className="w-full"
        >
          {platform}
        </Button>
      ))}
    </>
  )
}
