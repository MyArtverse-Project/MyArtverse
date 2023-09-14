import Image from "next/image"
import { Button } from "../Buttons"

export default function Commissions({
  description,
  imageURL,
  price,
  title
}: {
  imageURL: string
  title: string
  price: number
  description: string
}) {
  return (
    <div
      className="flex flex-col justify-start items-center w-fit my-4"
      data-commission-card=""
    >
      <div className="relative w-[568px] h-[156px] rounded-md overflow-hidden">
        <Image
          objectFit="cover"
          layout="fill"
          src={imageURL}
          alt=""
          className="hover:scale:90"
        />
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
