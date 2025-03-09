import { FaGoogle, FaTiktok } from "react-icons/fa"
import { RiTwitterXFill } from "react-icons/ri"
import { Button } from "@mav/ui/components/buttons"

const providers = [
    { icon: FaGoogle, platform: "Google" },
    { icon: RiTwitterXFill, platform: "X" },
    { icon: FaTiktok, platform: "TikTok" }
]

export default function AuthThirdPartyProviders() {
    return (
        <>
            {providers.map(({ icon: Icon, platform }, index) => (
                <Button
                    key={index}
                    icon={<Icon size={21} />}
                    variant="primary"
                    className="w-2/3"
                    position="center"
                >
                    {platform}
                </Button>
            ))}
        </>
    )
}