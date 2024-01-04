import Image from "next/image"
import { Button } from "../Buttons"
import MFImage from "../BuiImage"

export default function CommissionsListing({
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
    <div className="flex flex-col justify-start items-center w-fit my-4">
      <div className="relative w-[568px] h-[156px] rounded-md overflow-hidden">
        <div className="hover:scale:90">
          <MFImage src={img} />
        </div>
      </div>
      <div className="flex flex-col justify-between w-full mt-3">
        <div className="flex flex-row">
          <h1 className="not-prose mx-0 text-4xl text-left w-full font-bold">
            {title} - {price}
          </h1>
          <Button>Commission</Button>
        </div>
        <p className="not-prose mx-0 text-left w-full text-xl font-inter">
          {description}
        </p>
      </div>
    </div>
  )
}
