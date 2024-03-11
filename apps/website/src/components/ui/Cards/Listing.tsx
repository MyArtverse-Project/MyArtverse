import type { IconType } from "react-icons"
import { LuMoreVertical as MoreIcon, LuStar as StarIcon } from "react-icons/lu"
import { Badge } from "../Badges"
import { Button } from "../Buttons"
import MFImage from "../MFImage"

function ScopedLabel({ icon: Icon, text }: { icon: IconType; text: string }) {
  return (
    <span className="flex items-center gap-x-1">
      <Icon size={19} />
      {text}
    </span>
  )
}

export default function Listing({
  description,
  img,
  price,
  title,
  isPublic
}: {
  img: string
  title: string
  price: number
  description: string
  isPublic?: boolean
  isListingExpired?: boolean
}) {
  return (
    <div className="overflow-hidden rounded-md">
      <div className="mb-3">
        <MFImage src={img} alt="" aspectRatio="2/1" rounded={12} objectFit="cover" />
      </div>
      {/* Commission info */}
      <div className="flex flex-col gap-y-1.5">
        <div className="flex flex-wrap gap-x-1.5">
          <Badge size="big">ListingType</Badge>
          <Badge size="big" variant="error">
            NSFW
          </Badge>
          {/* <ScopedLabel icon={TimeIcon} text="69 hours remaining" /> */}
        </div>
        <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-1">
          {/* <MFImage src={img} alt="Your mom" aspectRatio="1" height={30} rounded={999} /> */}
          <h2 className="text-2xl font-bold">Cruel Summer</h2>
          <div className="col-span-2 flex flex-wrap gap-x-3">
            <span className="font-bold text-green-600">$20—$69</span>
          </div>
        </div>
        <div className="px-0.5 pt-1">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia alias, vel
            debitis voluptates numquam dolores commodi? Corporis alias perspiciatis autem
            quidem!
          </p>
          <div className="mt-2 inline-block cursor-pointer text-blue-600 hover:underline">
            See more
          </div>
        </div>
        {/* Links and CTA */}
        <div className="flex justify-between">
          <div></div>
          <div className="flex items-center gap-x-1">
            <Button icon={<MoreIcon size={20} />} />
            <Button icon={<StarIcon size={20} />} />
            <Button>Purchase</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
