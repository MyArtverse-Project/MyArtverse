import type { IconType } from "react-icons"
import { Button } from "../Buttons"
import MFImage from "../MFImage"

import {
  LuClock4 as TimeIcon,
  LuMoreVertical as MoreIcon,
  LuStar as StarIcon
} from "react-icons/lu"

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
  title
}: {
  img: string
  title: string
  price: number
  description: string
}) {
  return (
    <div className="overflow-hidden rounded-md shadow-md p-3.5 bg-white">
      <div className="mb-2.5">
        <MFImage
          src={img}
          alt=""
          aspectRatio="2/1"
          rounded={12}
          objectFit="cover"
        />
      </div>
      {/* Commission info */}
      <div className="flex flex-col gap-y-1.5">
        <div className="grid grid-cols-[auto,1fr] gap-y-1 gap-x-3">
          <MFImage
            src={img}
            alt="Your mom"
            aspectRatio="1"
            height={30}
            rounded={999}
          />
          <h2 className="font-bold text-2xl">Cruel Summer</h2>
          <div className="flex flex-wrap gap-x-3 col-span-2">
            <span>Taylor Swift</span>
            <span className="text-green-600">$20—$69</span>
            <ScopedLabel icon={TimeIcon} text="69 hours remaining" />
          </div>
        </div>
        <article className="px-0.5 pt-1">
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
            alias, vel debitis voluptates numquam dolores commodi? Corporis
            alias perspiciatis autem quidem!
          </div>
          <div className="inline-block mt-2 hover:underline cursor-pointer text-blue-600">
            See more
          </div>
        </article>
        {/* Links and CTA */}
        <div className="flex justify-between">
          <div></div>
          <div className="flex items-center gap-x-1">
            <Button iconOnly>
              <MoreIcon size={20} />
            </Button>
            <Button iconOnly>
              <StarIcon size={20} />
            </Button>
            <Button>Purchase</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
