import { Button } from "@mav/ui/components/buttons";
import { FaApple, FaGoogle, FaTiktok } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";


const providers = [
  { icon: FaGoogle, text: "Continue with Google" },
  { icon: RiTwitterXFill, text: "Continue with X" },
  { icon: FaTiktok, text: "Continue with TikTok" },
  { icon: FaApple, text: "Continue with Apple" },
]

export default function AuthThirdPartyProviders() {
    return (
        <>
            {providers.map(({ icon: Icon, text }, index) => (
                <Button
                    key={index}
                    icon={<Icon size={21} />}
                    variant="primary"
                    className="w-2/3"
                    position="center"
                >
                    {text}
                </Button>
            ))}
        </>
    )
}